const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const broadbandData = data.broadband;
const userData = data.users;
const appointmentRequestData = data.appointment;



function a2b(a) {
    var b, c, d, e = {},
        f = 0,
        g = 0,
        h = "",
        i = String.fromCharCode,
        j = a.length;
    for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
    for (c = 0; j > c; c++)
        for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8;)((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
    return h;
}



router.get('/users/moderators', async(req, res) => {
    // if (req.session.user) {
    let userName;
    //let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    // if (userName == 'admin') {
    //     isAdmin = true;
    // }
    const userNameList = await userData.getUsersList();
    let isAdmin = await userData.isAdmin(userName);
    res.render("users/moderators", { userName: userName, isAdmin: isAdmin, userNameList: userNameList })
        // }
        // else {
        //     res.redirect('/');
        // }
});

router.get('/users/admin', async(req, res) => {
    let userName;
    let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName == 'admin') {
        isAdmin = true;
    }
    res.render("users/admin", { userName: userName, isAdmin: isAdmin })
        // }
        // else {
        //     res.redirect('/');
        // }
});

router.get('/', async(req, res) => {
    if (req.session.user) {
        // let userappointment;
        let userName = req.session.user.userName;
        // try {
        //     userappointment = await appointmentRequestData.requestOfuser(userName);
        //     //res.render("broadband/index",{user:userName,appointmentdate:userappointment.date});
        // } catch (e) {
        //     res.status(500).json({ error: e });
        // }


        if (userName === "admin") {
            //await userData.updateIsAdmin(userName);
            //let isAdmin = await userData.isAdmin();
            res.render('broadband/index', { userName: userName, isAdmin: true });
        } else {
            //let isAdmin = await userData.isAdmin();
            res.render('broadband/index', { userName: userName, isAdmin: false });
        }
    } else {
        res.render('broadband/index');
    }
});


router.get('/error', async(req, res) => {
    res.status(400).render('errors/error');
});

router.get('/broadband/statistics', async(req, res) => {
    let userName
    if (req.session.user) {
        userName = req.session.user.userName;
    }
    try {
        let broadbandList = await broadbandData.listPlans();
        let plan = [];
        let users = [];
        if (broadbandList == null) {
            res.render('broadband/statistics', { userName: userName, plan: plan, users: users, error: 'No plans' });
        } else {
            for (let ele of broadbandList) {
                plan.push(ele.planName);
                users.push(ele.userID.length)
            }
            res.render('broadband/statistics', { userName: userName, plan: plan, users: users });
        }
    } catch (e) {
        res.status(500).render('broadband/statistics', { error: 'Internal Server Error' });

    }
})


router.get('/broadband/newPlan', async(req, res) => {

    if (req.session.user) {
        let userName = req.session.user.userName;
        if (userName == 'admin')
            res.render('broadband/newPlan', { userName: userName, isAdmin: true });
        else
            res.render('broadband/newPlan', { userName: userName, isAdmin: false });
    } else
        res.render('broadband/index');

});

router.get('/broadband/broadbandPlans', async(req, res) => {
    let userName;
    let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName == 'admin') {
        isAdmin = true;
    }
    try {
        let broadbandList = await broadbandData.listPlans();
        if (broadbandList === null) {
            res.status(400).render('broadband/broadbandPlans', { noPlan: "No plans found", userName: userName, isAdmin: isAdmin });
            return
        } else {
            res.render('broadband/broadbandPlans', { broadbandList: broadbandList, userName: userName, isAdmin: isAdmin });
        }
    } catch (e) {
        res.status(500).render('broadband/broadbandPlans', { error: 'Internal Server Error', userName: userName, isAdmin: isAdmin });

    }
});




router.post('/broadband/insert', async(req, res) => {

    const broadbandPlans = req.body;
    planName = xss(broadbandPlans.planName);
    price = xss(broadbandPlans.price);
    validity = xss(broadbandPlans.validity);
    limit = xss(broadbandPlans.limit);
    discount = xss(broadbandPlans.discount);

    if (!planName) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PLANNAME cannot be empty",
            planName: "",
            price: price,
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }
    if (typeof planName != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input PLANNAME should be string and valid",
            planName: "",
            price: price,
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }
    if (!planName.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PLANNAME should not have space",
            planName: "",
            price: price,
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }

    if (!price) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRCIE cannot be empty",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }
    if (!(/^\d+$/.test(price))) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRICE should be only numbers1",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }
    if (typeof price != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRICE should be only numbers",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }
    if (!price.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRICE should not have space",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount
        });
        return
    }

    if (!validity) {
        res.status(400).render('broadband/newPlan', {
            error: "Input VALIDITY cannot be empty",
            planName: planName,
            price: price,
            validity: "",
            limit: limit,
            discount: discount
        });
        return
    }
    if (typeof validity != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input VALIDITY should be string and valid",
            planName: planName,
            price: price,
            validity: "",
            limit: limit,
            discount: discount
        });
        return
    }
    if (!validity.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input VALIDITY should not have space",
            planName: planName,
            price: price,
            validity: "",
            limit: limit,
            discount: discount
        });
        return
    }

    if (!limit) {
        res.status(400).render('broadband/newPlan', {
            error: "Input LIMIT cannot be empty",
            planName: planName,
            price: price,
            validity: validity,
            limit: "",
            discount: discount
        });
        return
    }
    if (typeof limit != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input LIMIT should be string and valid",
            planName: planName,
            price: price,
            validity: validity,
            limit: "",
            discount: discount
        });
        return
    }
    if (!limit.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input LIMIT should not have space",
            planName: planName,
            price: price,
            validity: validity,
            limit: "",
            discount: discount
        });
        return
    }

    if (!discount) {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT cannot be empty",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: ""
        });
        return
    }
    if (!(/^\d{1,2}$/.test(discount))) {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT should be only numbers",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: ""
        });
        return
    }
    if (typeof discount != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT should be string and valid",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: ""
        });
        return
    }
    if (!discount.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT should not have space",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: ""
        });
        return
    }

    try {
        // const { planName, price, validity, limit, discount } = broadbandPlans;
        const newBroadband = await broadbandData.create(planName, price, validity, limit, discount);
        let plans = [];
        plans.push(newBroadband)
        res.redirect('/broadband/broadbandPlans');

    } catch (e) {
        if (e.statusCode && e.statusCode != 500) {
            res.status(e.statusCode).render('broadband/newPlan', {
                error: e.message,
                planName: planName,
                price: price,
                validity: validity,
                limit: limit,
                discount: discount
            });
        } else
            res.status(500).render('broadband/newPlan', {
                error: "Internal Server error",
                planName: planName,
                price: price,
                validity: validity,
                limit: limit,
                discount: discount
            });
    }
});

router.get('/broadband/subscribe/:name', async(req, res) => {
    //console.log(req.query.val);
    if (!req.session.user) {
        res.redirect('/users/login');
        return;
    }

    if (req.session.user.userName === 'admin') {
        res.redirect('broadbandPlans');
        return;
    }

    if (!req.query.val) {
        res.redirect('/broadband/broadbandPlans');
        return;
    }
    let val = a2b(req.query.val);
    //console.log(val);
    if (val !== 'true') {
        res.redirect('broadbandPlans');
        return;
    }
    planName = xss(req.params.name);



    try {
        let plan = await broadbandData.getPlan(planName);
        res.render('broadband/selectedPlan', { userName: req.session.user.userName, planName: plan.planName, price: plan.price, validity: plan.validity, limit: plan.limit, discount: plan.discount });
    } catch (e) {
        if (e.statusCode) {
            redirect('broadband/broadbandPlans', { error: e.message });
        } else
            redirect('broadband/broadbandPlans', { error: "Internal Server error" });
    }
});


router.get('/broadband/contactus', async(req, res) => {
    if (!req.session.user) {
        res.render("broadband/contactus");
        return;
    }
    if (req.session.user.userName === 'admin') {
        res.redirect('/');
        return;
    }

    res.render("broadband/contactus", { userName: req.session.user.userName });
});

router.post('/broadband/scrap/:id', async(req, res) => {

    let userName;
    let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName == 'admin') {
        isAdmin = true;
    }

    if (!req.params.id.replace(/\s/g, '').length) {
        res.status(400).render('broadband/broadbandPlans', { error: 'Invalid ID try one more time', isAdmin: isAdmin });
        return;
    }
    if (!req.params.id) {
        res.status(400).render('broadband/broadbandPlans', { error: 'Invalid ID try one more time', isAdmin: isAdmin });
        return;
    }
    if (typeof req.params.id != 'string') {
        res.status(400).render('broadband/broadbandPlans', { error: 'Invalid ID try one more time', isAdmin: isAdmin });
        return;
    }
    try {
        const removeBroadband = await broadbandData.remove(req.params.id);
        if (removeBroadband == 'Success') {
            res.redirect('/broadband/broadbandPlans');
        }
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).render('broadband/broadbandPlans', { error: e.message, isAdmin: isAdmin });
        } else
            res.status(e.statusCode).render('broadband/broadbandPlans', { error: "Internal Server error", isAdmin: isAdmin });
    }
});

router.post('/broadband/update', async(req, res) => {

    let isAdmin = false;
    let userName
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName == 'admin') {
        isAdmin = true;
    }
    const broadbandPlans = req.body;
    planName = xss(broadbandPlans.planName);
    price = xss(broadbandPlans.price);
    validity = xss(broadbandPlans.validity);
    limit = xss(broadbandPlans.limit);
    discount = xss(broadbandPlans.discount);

    if (!planName) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PLANNAME cannot be empty",
            planName: "",
            price: price,
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof planName != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PLANNAME should be string and valid",
            planName: "",
            price: price,
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!planName.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PLANNAME should not have space",
            planName: "",
            price: price,
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!price) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRCIE cannot be empty",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!(/^\d+$/.test(price))) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRICE should be only numbers",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof price != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRICE should be only numbers",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!price.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRICE should not have space",
            planName: planName,
            price: "",
            validity: validity,
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!validity) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input VALIDITY cannot be empty",
            planName: planName,
            price: price,
            validity: "",
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof validity != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input VALIDITY should be string and valid",
            planName: planName,
            price: price,
            validity: "",
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!validity.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input VALIDITY should not have space",
            planName: planName,
            price: price,
            validity: "",
            limit: limit,
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!limit) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input LIMIT cannot be empty",
            planName: planName,
            price: price,
            validity: validity,
            limit: "",
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof limit != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input LIMIT should be string and valid",
            planName: planName,
            price: price,
            validity: validity,
            limit: "",
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!limit.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input LIMIT should not have space",
            planName: planName,
            price: price,
            validity: validity,
            limit: "",
            discount: discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!discount) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT cannot be empty",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }
    if (!(/^\d{1,2}$/.test(discount))) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT should be only numbers",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }
    if (typeof discount != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT should be string and valid",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }
    if (!discount.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT should not have space",
            planName: planName,
            price: price,
            validity: validity,
            limit: limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }

    try {

        const { id, planName, price, validity, limit, discount } = broadbandPlans;

        const UpdatedPlan = await broadbandData.update(id, planName, price, validity, limit, discount);
        // if (UpdatedRestaurant == null) {
        //     res.status(404).json({ error: `No plan found with id}` });
        //     return
        // }
        res.redirect('/broadband/broadbandPlans');

    } catch (e) {
        if (e.statusCode && e.statusCode != 500) {
            res.status(e.statusCode).render('broadband/updatePlan', {
                error: e.message,
                planName: planName,
                price: price,
                validity: validity,
                limit: limit,
                discount: discount,
                isAdmin: isAdmin
            });
        } else {
            res.status(500).render('broadband/updatePlan', {
                error: "Internal Server error",
                planName: planName,
                price: price,
                validity: validity,
                limit: limit,
                discount: discount,
                isAdmin: isAdmin
            });
        }
    }
});

router.post('/broadband/getByName/:id', async(req, res) => {

    let userName;
    let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName == 'admin') {
        isAdmin = true;
    }

    if (!req.params.id.replace(/\s/g, '').length) {
        res.status(400).render('broadband/broadbandPlans', { error: 'Invalid ID try one more time', isAdmin: isAdmin });
        return;
    }
    if (!req.params.id) {
        res.status(400).render('broadband/broadbandPlans', { error: 'Invalid ID try one more time', isAdmin: isAdmin });
        return;
    }
    if (typeof req.params.id != 'string') {
        res.status(400).render('broadband/broadbandPlans', { error: 'Invalid ID try one more time', isAdmin: isAdmin });
        return;
    }

    try {
        const plan = await broadbandData.get(req.params.id);
        if (plan == null) {
            res.status(404).render('broadband/broadbandPlans', { error: 'No plan FOUND', isAdmin: isAdmin });
        }
        res.render('broadband/updatePlan', { id: plan._id, planName: plan.planName, price: plan.price, validity: plan.validity, limit: plan.limit, discount: plan.discount, isAdmin: isAdmin });
    } catch (e) {
        if (e.statusCode && e.statusCode != 500) {
            res.status(e.statusCode).render('broadband/broadbandPlans', { error: e.message, isAdmin: isAdmin });
        } else
            res.status(500).render('broadband/broadbandPlans', { error: 'Internal Server Error', isAdmin: isAdmin });
    }
});







module.exports = router;