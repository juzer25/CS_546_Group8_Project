const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;
const appointmentRequestData = data.appointment;

router.get('/', async(req, res) => {
    if (req.session.user) {
        let userappointment;
        let userName = req.session.user.userName;
        try{
            userappointment = await appointmentRequestData.requestOfuser(userName);
            //res.render("broadband/index",{user:userName,appointmentdate:userappointment.date});
        }catch(e){
            res.status(500).json({ error: e });
        }


        if (userName === "admin") {
            res.render('broadband/index', { userName: userName, isAdmin: true });
        } else {
            res.render('broadband/index', { userName: userName, appointmentdate:userappointment ,isAdmin: false });
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
    // res.render('broadband/newPlan');
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
        res.redirect('/broadband/broadbandPlans');

    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).json({ error: e.message });
        } else
            res.status(500).json({ error: e });
    }
});
router.get('/broadband/subscribe/:name', async (req,res) =>{
    planName =  req.params.name;
    try{
        let plan = await broadbandData.getPlan(planName);

        res.render('broadband/selectedPlan',{planName:plan.planName, price:plan.price,validity:plan.validity,limit:plan.limit,discount:plan.discount});
    }
    catch(e){
        res.sendStatus(404);
    }
})
router.post('/broadband/scrap/:name', async(req, res) => {

    try {
        const removeBroadband = await broadbandData.remove(req.params.name);
        if (removeBroadband == 'Success') {
            res.redirect('/broadband/broadbandPlans');
        }
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).json({ error: e.message });
        } else
            res.status(500).json({ error: e.message });
    }


});


module.exports = router;