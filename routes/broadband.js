const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;
const appointmentRequestData = data.appointment;

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
            res.render('broadband/index', { userName: userName, isAdmin: true });
        } else {
            res.render('broadband/index', { userName: userName, isAdmin: false });
        }
    } else {
        res.render('broadband/index');
    }
});


router.get('/error', async (req,res)=>{
    res.status(400).render('errors/error');
});

router.get('/broadband/statistics', async(req, res) => {
    try {
        let broadbandList = await broadbandData.listPlans();
        let plan = [];
        let users = [];
        for (let ele of broadbandList) {
            plan.push(ele.planName);
            users.push(ele.userID.length)
        }
        res.render('broadband/statistics', { plan: plan, users: users });
    } catch (e) {
        res.status(500).json({ error: e });

    }
})


router.get('/broadband/newPlan', async(req, res) => {

    // if (!req.session.user) {
    //     res.redirect('/');
    // } else {
    //     if (req.session.user.userName === 'admin') {
    //         res.render('broadband/newPlan', { userName: req.session.user.userName });
    //     } else {
    //         res.redirect('/');
    //     }
    // }


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
    let userName;
    let isAdmin = false;
    if (req.session.user) {
        userName = req.session.user.userName;
    }

    if (userName === 'admin') {
        isAdmin = true;
    }
    try {
        let broadbandList = await broadbandData.listPlans();
        res.render('broadband/broadbandPlans', { broadbandList: broadbandList, userName: userName, isAdmin: isAdmin });
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
    let val = atob(req.query.val);
    //console.log(val);
    if (val !== 'true') {
        res.redirect('broadbandPlans');
        return;
    }
    planName = req.params.name;



    try {
        let plan = await broadbandData.getPlan(planName);

        res.render('broadband/selectedPlan',{userName:req.session.user.userName,planName:plan.planName, price:plan.price,validity:plan.validity,limit:plan.limit,discount:plan.discount});
    }
    catch(e){
        res.sendStatus(404);
    }
});

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

router.post('/broadband/update', async(req, res) => {

    try {
        const broadbandPlans = req.body;
        const { id, planName, price, validity, limit, discount } = broadbandPlans;

        const UpdatedPlan = await broadbandData.update(id, planName, price, validity, limit, discount);
        // if (UpdatedRestaurant == null) {
        //     res.status(404).json({ error: `No plan found with id}` });
        //     return
        // }
        res.redirect('/broadband/broadbandPlans');

    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).send({ error: e.message });
        } else
            res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/broadband/getByName/:id', async(req, res) => {

    try {
        const plan = await broadbandData.get(req.params.id);
        res.render('broadband/updatePlan', { plan: plan });
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).send({ error: e.message });
        } else
            res.status(500).json({ error: 'Internal Server Error' });

    }
});







module.exports = router;