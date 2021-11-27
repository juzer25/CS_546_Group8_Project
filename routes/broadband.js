const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;

router.get('/', async(req, res) => {
    let userName;
    if (req.session.user) {
        userName = req.session.user.userName;
    } else {
        res.render('broadband/newPlan');
    }
    if (userName) {
        res.render('broadband/newPlan', { userName: userName });
    } else {}
});

router.post('/broadband/insert', async(req, res) => {

    const broadbandPlans = req.body;
    // planName = broadbandPlans.planName;
    // price = broadbandPlans.price;
    // validity = broadbandPlans.validity;
    // limit = broadbandPlans.limit;
    // discount = broadbandPlans.discount;
    try {
        const { planName, price, validity, limit, discount } = broadbandPlans;
        const newBroadband = await broadbandData.create(planName, price, validity, limit, discount);
        // res.json(newBroadband);

        res.render('broadband/index', { newBroadband: newBroadband });
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).json({ error: e.message });
        } else
            res.status(500).json({ error: e });
    }
});





module.exports = router;