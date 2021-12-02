const express = require('express');
const router = express.Router();
const data = require('../data');
const userCardData = data.checkout;

router.get('/checkout', async(req, res) => {
    res.render("checkout/checkout")
});


router.get('/checkout/bill', async(req, res) => {
    res.render("checkout/bill")
});

router.post('/payment', async(req, res) => {
     let userName = req.body.Username;
    //let userName = "shivank";
    let nameOfCardHolder = req.body.cardname;
    let cardNumber = req.body.cardnumber;
    let expirationMonth = req.body.expmonth;
    let expirationYear = req.body.expyear;
    try{
   // if (req.session.user) {

       // let userName = req.session.user.userName;;

        cardDetails = await userCardData.storeCardDetails(userName, nameOfCardHolder, cardNumber, expirationMonth, expirationYear);
        res.redirect("/checkout/bill");
    //}
    }
    catch(e){
        res.status(500).json({ error: e });
    }
 
});

module.exports = router;