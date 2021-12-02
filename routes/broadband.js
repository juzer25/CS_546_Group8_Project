const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;

router.get('/', async(req, res) => {
    if (req.session.user) {

        let userName = req.session.user.userName;;


        if (userName === "admin") {
            res.render('broadband/index', { userName: userName, isAdmin: true });
        } else {
            res.render('broadband/index', { userName: userName, isAdmin: false });
        }
    } else {
        res.render('broadband/index');
    }
});


router.get('/broadband/newPlan', async(req, res) => {

    if (!req.session.user) {
        res.redirect('/');
    } else {
        if (req.session.user.userName === 'admin') {
            res.render('broadband/newPlan', { userName: req.session.user.userName });
        } else {
            res.redirect('/');
        }
    }


    // if (!req.session.user) {
    //     res.redirect('/');
    // } else {
    //     if (req.session.user.userName === 'admin') {
    res.render('broadband/newPlan');
    //     } else {, { userName: req.session.user.userName }
    //         res.redirect('/');
    //     }
    // }

});

router.get('/broadband/broadbandPlans', async(req, res) => {
    try {
        let broadbandList = await broadbandData.listPlans();
        res.render('broadband/broadbandPlans', { broadbandList: broadbandList });
    } catch (e) {
        res.status(500).json({ error: e });

    }
});




router.post('/broadband/insert', async(req, res) => {

    const broadbandPlans = req.body;
    try {
        const { planName, price, validity, limit, discount } = broadbandPlans;
        const newBroadband = await broadbandData.create(planName, price, validity, limit, discount);
        // res.json(newBroadband);
        let plans = [];
        plans.push(newBroadband)
        res.redirect('/');
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).json({ error: e.message });
        } else
            res.status(500).json({ error: e });
    }
});


module.exports = router;