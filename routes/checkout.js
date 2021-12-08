const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const userCardData = data.checkout;

router.get('/checkout', async(req, res) => {
   // if (req.session.user) {
        res.render("checkout/checkout")
    // }
    // else {
    //     res.redirect('/');
    // }
});


router.get('/checkout/bill', async(req, res) => {
    res.render("checkout/bill")
});

router.post('/payment', async(req, res) => {
    let userName = "shivank";
    //let userName = xss(req.session.user.userName);
    let nameOfCardHolder = xss(req.body.cardname);
    let cardNumber = xss(req.body.cardnumber);
    let expirationMonth = xss(req.body.expmonth);
    let expirationYear = xss(req.body.expyear);
    let cvv = xss(req.body.cvv)
     

    if(!userName) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a userName"});
        return;
    }
    
    if(!nameOfCardHolder) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a card holder name"});
        return;
    }
    if(nameOfCardHolder.length === 0){
        res.status(400).render("checkout/checkout",
         {error:"Please provide a card holder name"});
        return;
    }
    if(nameOfCardHolder.trim().length === 0){
        res.status(400).render("checkout/checkout",
         {error:"Please provide a card holder name"});
        return;
    }

    if(!cardNumber) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a card number"});
        return;
    }
    if(cardNumber.length === 0) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a card number"});
        return;
    }

    if(cardNumber.trim().length === 0) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a card number"});
        return;
    }
    if(cardNumber.length !== 16) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a valid card number"});
        return;
    }
    if(typeof parseInt(cardNumber) !== 'number'){
        res.status(400).render("checkout/checkout",
         {error:"Card number should be Interger"});
        return;
    }

    if(!expirationMonth) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a expiry Month"});
        return;
    }
    if(expirationMonth.length === 0) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a expiry Month"});
        return;
    }
    if(expirationMonth.trim().length === 0) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a expiry Month"});
        return;
    }
    if(expirationMonth.length !== 2 && expirationMonth.length !== 1){
        res.status(400).render("checkout/checkout",
         {error:"Please provide a valid expiry Month"});
        return;
    }
    if(expirationMonth > 12){
        res.status(400).render("checkout/checkout",
         {error:"Please provide a valid expiry Month"});
        return;
    }
    if(typeof parseInt(expirationMonth) !== 'number'){
        res.status(400).render("checkout/checkout",
         {error:"Expirt month should be Interger"});
        return;
    }

    if(!expirationYear) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a expiry year"});
        return;
    }
    if(expirationYear.trim().length === 0) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a expiry year"});
        return;
    }
    if(expirationYear.length !== 2) {
        res.status(400).render("checkout/checkout",
         {error:"Please provide a valid expiry year"});
        return;
    }
    if(typeof parseInt(expirationYear) !== 'number'){
        res.status(400).render("checkout/checkout",
         {error:"Expiry year should be Interger"});
        return;
    }

    let CurrentDate = new Date();
    let currYearStr = CurrentDate.getFullYear().toString();
    let expirationYearFourDigit = "20";
        
    if(expirationYear.length === 2){
        expirationYearFourDigit = expirationYearFourDigit + expirationYear;
    }
    if(expirationYearFourDigit < currYearStr){
        res.status(400).render("checkout/checkout",
         {error:"You card has been expired. Please use different card for payment"});
        return;
    }
    else if(parseInt(expirationYearFourDigit) > parseInt(currYearStr) + 10){
        res.status(400).render("checkout/checkout",
         {error:"Please use different card for payment. This card seems ambitious"});
        return;
    }
    //TODO: Month expiry errorhandling is not perfect
    if(!cvv) {
        res.status(400).render("checkout/checkout",
         {error:"Please enter a cvv"});
        return;
    }
    if(cvv.trim().length === 0) {
        res.status(400).render("checkout/checkout",
         {error:"Please enter a cvv"});
        return;
    }
    if(cvv.length > 3) {
        res.status(400).render("checkout/checkout",
         {error:"Please enter a cvv"});
        return;
    }
    if(typeof parseInt(cvv) !== 'number'){
        res.status(400).render("checkout/checkout",
         {error:"CVV should be Interger"});
        return;
    }
    //TODO: check if cvv should be added to database or not
    
       // if (req.session.user) {
            try{
            // let userName = req.session.user.userName;

            cardDetails = await userCardData.storeCardDetails(userName, nameOfCardHolder, cardNumber, expirationMonth, expirationYear);
            res.redirect("/checkout/bill");
            }
            catch(e){
                res.status(500).json({ error: e });
            }
        // }else {
        //     res.redirect('/');
        // }
    
 
});

module.exports = router;