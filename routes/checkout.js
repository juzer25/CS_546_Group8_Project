const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const userCheckoutData = data.checkout;
const userData = data.users;
const broadbandData = data.broadband;


router.get('/checkout', async(req, res) => {
    if (req.session.user) {
        res.render("checkout/checkout")
    } else {
        res.redirect('/');
    }
});



router.get('/checkout/yourorders', async(req, res) => {

    if (!req.session.user) {
        res.redirect('/');
    }
    let userName;
    let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName == 'admin') {
        isAdmin = true;
    }

    try {
        let user = await userData.userProfile(req.session.user.userName);

        if (user) {

            if (user.planSelected.length > 0) {
                let CurrentDate = new Date();
                let currDateString = user.planSelected[user.planSelected.length - 1].startDate;
                let orderId = user.planSelected[user.planSelected.length - 1].orderId;
                let planId = user.planSelected[user.planSelected.length - 1].broadbandPlanId;
                let planDetails = await userCheckoutData.getBroadbandPlanById(planId);
                let listplanDetails = new Array();
                //listplanDetails.push(user.planSelected); 
                res.render('checkout/yourorders', {
                    listplanDetails: user.planSelected,
                    planSelectedId: planId,
                    name: planDetails.planName,
                    price: planDetails.price,
                    validity: planDetails.validity,
                    orderId: orderId,
                    billDate: currDateString,
                    userName: user.userName,
                    userName: userName,
                    isAdmin: isAdmin
                })
            }
        } else {
            res.render('checkout/yourorders', { userName: userName, isAdmin: isAdmin });
        }
    } catch (e) {
        res.status(404).render('checkout/yourorders', { userName: userName, isAdmin: isAdmin });
    }
    //res.render("checkout/bill")
});


router.post('/checkout/bill/:id', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/');
    }
    let userName;
    if (req.session.user) {
        userName = xss(req.session.user.userName);
    }
    if (!req.params.id) {
        res.status(400).render('checkout/yourorders', { error: 'Invalid ID. PLease try one more time' });
        return;
    }
    if (typeof req.params.id != 'string') {
        res.status(400).render('checkout/yourorders', { error: 'Invalid ID. Please try one more time' });
        return;
    }
    try {
        let user = await userData.userProfile(req.session.user.userName);
        // let plan = await broadbandData.get(req.params.id);
        // if (plan == null) throw { statusCode: 404, message: 'plan not found' }
        if (user) {
            if (user.planSelected.length > 0) {
                let currDateString;
                let orderId;
                let planId;
                let planName;
                let price;
                let validity;
                for (let i = 0; i < user.planSelected.length; i++) {
                    if (user.planSelected[i].broadbandPlanId == req.params.id) {
                        currDateString = user.planSelected[i].startDate;
                        orderId = user.planSelected[i].orderId;
                        planId = user.planSelected[i].broadbandPlanId;
                        planName = user.planSelected[i].planName;
                        price = (user.planSelected[i].price);
                        validity = user.planSelected[i].endDate;
                        break;
                    }
                    // * (1 - (user.planSelected[i].discount / 100));
                }
                // let currDateString = user.planSelected[user.planSelected.length-1].startDate;
                // let orderId = user.planSelected[user.planSelected.length-1].orderId;
                // let planId = user.planSelected[user.planSelected.length-1].broadbandPlanId;
                // let planDetails = await userCheckoutData.getBroadbandPlanById(planId);

                res.render('checkout/bill', {
                    planSelectedId: planId,
                    name: planName,
                    price: price,
                    validity: validity,
                    orderId: orderId,
                    billDate: currDateString,
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    phoneNo: user.phoneNo,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    zipcode: user.zipcode
                })
            }

        }
        return;

    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).render('/checkout/yourorders', { error: e.message });
        } else
            res.status(e.statusCode).render('broadband/broadbandPlans', { error: "Internal Server error" });
    }

});

router.get('/checkout/bill', async(req, res) => {

    if (!req.session.user) {
        res.redirect('/');
    }

    try {
        let user = await userData.userProfile(req.session.user.userName);
        if (user) {

            let CurrentDate = new Date();
            let currDateString = user.planSelected[user.planSelected.length - 1].startDate;
            let orderId = user.planSelected[user.planSelected.length - 1].orderId;
            let planId = user.planSelected[user.planSelected.length - 1].broadbandPlanId;
            let planDetails = await userCheckoutData.getBroadbandPlanById(planId);



            res.render('checkout/bill', {
                planSelectedId: planId,
                name: planDetails.planName,
                price: user.planSelected[user.planSelected.length - 1].price,
                validity: user.planSelected[user.planSelected.length - 1].endDate,
                orderId: orderId,
                billDate: currDateString,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                phoneNo: user.phoneNo,
                address: user.address,
                city: user.city,
                state: user.state,
                zipcode: user.zipcode
            })
        }
    } catch (e) {
        res.status(404).json({ error: e })
    }
    //res.render("checkout/bill")
});


router.post('/payment', async(req, res) => {
    let userName = xss(req.session.user.userName);
    let nameOfCardHolder = xss(req.body.cardname);
    let cardNumber = xss(req.body.cardnumber);
    let expirationMonth = xss(req.body.expmonth);
    let expirationYear = xss(req.body.expyear);
    let cvv = xss(req.body.cvv)


    if (!userName) {
        res.status(400).render("checkout/checkout", { error: "Please provide a userName" });
        return;
    }

    if (!nameOfCardHolder) {
        res.status(400).render("checkout/checkout", { error: "Please provide a card holder name" });
        return;
    }
    if (nameOfCardHolder.length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a card holder name" });
        return;
    }
    if (nameOfCardHolder.trim().length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a card holder name" });
        return;
    }

    if (!cardNumber) {
        res.status(400).render("checkout/checkout", { error: "Please provide a card number" });
        return;
    }
    if (cardNumber.length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a card number" });
        return;
    }

    if (cardNumber.trim().length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a card number" });
        return;
    }
    if (cardNumber.length !== 16) {
        res.status(400).render("checkout/checkout", { error: "Please provide a valid card number" });
        return;
    }
    if (typeof parseInt(cardNumber) !== 'number') {
        res.status(400).render("checkout/checkout", { error: "Card number should be Interger" });
        return;
    }
    var regNo = /[0-9]{16}/;
    if (!regNo.test(cardNumber)) {
        res.status(400).render("checkout/checkout", { error: "Card number should be Interger" });
        return;
    }

    if (!expirationMonth) {
        res.status(400).render("checkout/checkout", { error: "Please provide a expiry Month" });
        return;
    }
    if (expirationMonth.length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a expiry Month" });
        return;
    }
    if (expirationMonth.trim().length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a expiry Month" });
        return;
    }
    if (expirationMonth.length !== 2) {
        res.status(400).render("checkout/checkout", { error: "Please provide a valid expiry Month" });
        return;
    }
    var regDate = /^\d{2}$/;
    if (!regDate.test(expirationMonth)) {
        res.status(400).render("checkout/checkout", { error: "Expiry month should be Interger" });
        return;
    }
    if (expirationMonth > 12) {
        res.status(400).render("checkout/checkout", { error: "Please provide a valid expiry Month" });
        return;
    }
    if (typeof parseInt(expirationMonth) !== 'number') {
        res.status(400).render("checkout/checkout", { error: "Expiry month should be Interger" });
        return;
    }

    if (!expirationYear) {
        res.status(400).render("checkout/checkout", { error: "Please provide a expiry year" });
        return;
    }
    if (expirationYear.trim().length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please provide a expiry year" });
        return;
    }
    if (expirationYear.length !== 2) {
        res.status(400).render("checkout/checkout", { error: "Please provide a valid expiry year" });
        return;
    }
    if (!regDate.test(expirationYear)) {
        res.status(400).render("checkout/checkout", { error: "Expiry year should be Interger" });
        return;
    }
    if (typeof parseInt(expirationYear) !== 'number') {
        res.status(400).render("checkout/checkout", { error: "Expiry year should be Interger" });
        return;
    }

    let CurrentDate = new Date();
    let currMonthStr = CurrentDate.getMonth().toString();
    currMonthStr = parseInt(currMonthStr) + 1;
    currMonthStr = currMonthStr.toString();
    let currYearStr = CurrentDate.getFullYear().toString();
    let expirationYearFourDigit = "20";

    if (expirationYear.length === 2) {
        expirationYearFourDigit = expirationYearFourDigit + expirationYear;
    }
    if (expirationYearFourDigit < currYearStr) {
        res.status(400).render("checkout/checkout", { error: "You card has been expired. Please use different card for payment" });
        return;
    } else if (parseInt(expirationYearFourDigit) > parseInt(currYearStr) + 10) {
        res.status(400).render("checkout/checkout", { error: "Please use different card for payment. This card seems ambitious" });
        return;
    }

    if (expirationYearFourDigit == currYearStr && expirationMonth < currMonthStr) {
        res.status(400).render("checkout/checkout", { error: "You card has been expired. Please use different card for payment" });
        return;
    }

    if (!cvv) {
        res.status(400).render("checkout/checkout", { error: "Please enter a cvv" });
        return;
    }
    if (cvv.trim().length === 0) {
        res.status(400).render("checkout/checkout", { error: "Please enter a cvv" });
        return;
    }
    if (cvv.length !== 3) {
        res.status(400).render("checkout/checkout", { error: "Please enter a valid cvv" });
        return;
    }
    var regCvv = /^\d{3}$/;
    if (!regCvv.test(cvv)) {
        res.status(400).render("checkout/checkout", { error: "CVV should be Interger" });
        return;
    }
    if (typeof parseInt(cvv) !== 'number') {
        res.status(400).render("checkout/checkout", { error: "CVV should be Interger" });
        return;
    }
    //TODO: check if cvv should be added to database or not

    if (req.session.user) {
        try {
            let userName = req.session.user.userName;

            cardDetails = await userCheckoutData.storeCardDetails(userName, nameOfCardHolder, cardNumber, expirationMonth, expirationYear);
            res.redirect("/checkout/bill");
        } catch (e) {
            res.status(500).json({ error: e });
        }
    } else {
        res.redirect('/');
    }


});

module.exports = router;