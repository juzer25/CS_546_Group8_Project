const express = require('express');
const router = express.Router();
const data = require('../data');
const userCardData = data.checkout;


router.post('/checkout', async(req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    console.log(userName);
    try {
        cardDetails = await userCardData.storeCardDetails(userId, nameOfCardHolder, cardNumber, expirationMonth, expirationYear);

    } catch (e) {
        res.status(400).render('/checkout');
    }
});