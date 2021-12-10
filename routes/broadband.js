const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;
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


router.get('/', async(req, res) => {
    if (req.session.user) {
        // let userappointment;
        let userName = req.session.user;
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


router.get('/error', async(req, res) => {
    res.status(400).render('errors/error');
});

router.get('/broadband/statistics', async(req, res) => {
    try {
        let broadbandList = await broadbandData.listPlans();
        let plan = [];
        let users = [];
        if (broadbandList == null) {
            res.render('broadband/statistics', { plan: plan, users: users, error: 'No plans' });
        } else {
            for (let ele of broadbandList) {
                plan.push(ele.planName);
                users.push(ele.userID.length)
            }
            res.render('broadband/statistics', { plan: plan, users: users });
        }
    } catch (e) {
        res.status(500).render('broadband/statistics', { error: 'Internal Server Error' });

    }
})


router.post('/broadband/newPlan', async(req, res) => {

    if (req.session.user) {
        // let userappointment;
        let userName = req.session.user;
        if (userName == 'admin')
            res.render('broadband/newPlan', { userName: userName, isAdmin: true });
        else
            res.render('broadband/newPlan', { userName: userName, isAdmin: false });
    } else
        res.render('broadband/newPlan', { userName: userName, isAdmin: false });

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
        res.status(500).render('broadband/broadbandPlans', { error: 'Internal Server Error' });

    }
});




router.post('/broadband/insert', async(req, res) => {

    const broadbandPlans = req.body;
    if (!broadbandPlans.planName) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PLANNAME cannot be empty",
            planName: "",
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (typeof broadbandPlans.planName != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input PLANNAME should be string and valid",
            planName: "",
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (!broadbandPlans.planName.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PLANNAME should not have space",
            planName: "",
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }

    if (!broadbandPlans.price) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRCIE cannot be empty",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (!(/^\d+$/.test(broadbandPlans.price))) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRICE should be only numbers1",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (typeof broadbandPlans.price != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRICE should be only numbers",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (!broadbandPlans.price.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input PRICE should not have space",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }

    if (!broadbandPlans.validity) {
        res.status(400).render('broadband/newPlan', {
            error: "Input VALIDITY cannot be empty",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: "",
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (typeof broadbandPlans.validity != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input VALIDITY should be string and valid",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: "",
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }
    if (!broadbandPlans.validity.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input VALIDITY should not have space",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: "",
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount
        });
        return
    }

    if (!broadbandPlans.limit) {
        res.status(400).render('broadband/newPlan', {
            error: "Input LIMIT cannot be empty",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: "",
            discount: broadbandPlans.discount
        });
        return
    }
    if (typeof broadbandPlans.limit != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input LIMIT should be string and valid",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: "",
            discount: broadbandPlans.discount
        });
        return
    }
    if (!broadbandPlans.limit.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input LIMIT should not have space",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: "",
            discount: broadbandPlans.discount
        });
        return
    }

    if (!broadbandPlans.discount) {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT cannot be empty",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: ""
        });
        return
    }
    if (!(/^\d{1,2}$/.test(broadbandPlans.discount))) {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT should be only numbers",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: ""
        });
        return
    }
    if (typeof broadbandPlans.discount != 'string') {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT should be string and valid",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: ""
        });
        return
    }
    if (!broadbandPlans.discount.replace(/\s/g, '').length) {
        res.status(400).render('broadband/newPlan', {
            error: "Input DISCOUNT should not have space",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: ""
        });
        return
    }

    try {
        const { planName, price, validity, limit, discount } = broadbandPlans;
        const newBroadband = await broadbandData.create(planName, price, validity, limit, discount);
        let plans = [];
        plans.push(newBroadband)
        res.redirect('/broadband/broadbandPlans');

    } catch (e) {
        if (e.statusCode && e.statusCode != 500) {
            res.status(e.statusCode).render('broadband/newPlan', {
                error: e.message,
                planName: broadbandPlans.planName,
                price: broadbandPlans.price,
                validity: broadbandPlans.validity,
                limit: broadbandPlans.limit,
                discount: broadbandPlans.discount
            });
        } else
            res.status(500).render('broadband/newPlan', { error: "Internal Server error" });
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
    planName = req.params.name;



    try {
        let plan = await broadbandData.getPlan(planName);

        res.render('broadband/selectedPlan', { userName: req.session.user.userName, planName: plan.planName, price: plan.price, validity: plan.validity, limit: plan.limit, discount: plan.discount });
    } catch (e) {
        res.sendStatus(404);
    }
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
    if (!broadbandPlans.planName) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PLANNAME cannot be empty",
            planName: "",
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof broadbandPlans.planName != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PLANNAME should be string and valid",
            planName: "",
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!broadbandPlans.planName.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PLANNAME should not have space",
            planName: "",
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!broadbandPlans.price) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRCIE cannot be empty",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!(/^\d+$/.test(broadbandPlans.price))) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRICE should be only numbers",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof broadbandPlans.price != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRICE should be only numbers",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!broadbandPlans.price.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input PRICE should not have space",
            planName: broadbandPlans.planName,
            price: "",
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!broadbandPlans.validity) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input VALIDITY cannot be empty",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: "",
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof broadbandPlans.validity != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input VALIDITY should be string and valid",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: "",
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!broadbandPlans.validity.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input VALIDITY should not have space",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: "",
            limit: broadbandPlans.limit,
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!broadbandPlans.limit) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input LIMIT cannot be empty",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: "",
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (typeof broadbandPlans.limit != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input LIMIT should be string and valid",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: "",
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }
    if (!broadbandPlans.limit.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input LIMIT should not have space",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: "",
            discount: broadbandPlans.discount,
            isAdmin: isAdmin
        });
        return
    }

    if (!broadbandPlans.discount) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT cannot be empty",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }
    if (!(/^\d{1,2}$/.test(broadbandPlans.discount))) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT should be only numbers",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }
    if (typeof broadbandPlans.discount != 'string') {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT should be string and valid",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }
    if (!broadbandPlans.discount.replace(/\s/g, '').length) {
        res.status(400).render('broadband/updatePlan', {
            error: "Input DISCOUNT should not have space",
            planName: broadbandPlans.planName,
            price: broadbandPlans.price,
            validity: broadbandPlans.validity,
            limit: broadbandPlans.limit,
            discount: "",
            isAdmin: isAdmin
        });
        return
    }

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
        if (e.statusCode && e.statusCode != 500) {
            res.status(e.statusCode).render('broadband/updatePlan', {
                error: e.message,
                planName: broadbandPlans.planName,
                price: broadbandPlans.price,
                validity: broadbandPlans.validity,
                limit: broadbandPlans.limit,
                discount: broadbandPlans.discount,
                isAdmin: isAdmin
            });
        } else {
            res.status(500).render('broadband/updatePlan', {
                error: "Internal Server error",
                planName: broadbandPlans.planName,
                price: broadbandPlans.price,
                validity: broadbandPlans.validity,
                limit: broadbandPlans.limit,
                discount: broadbandPlans.discount,
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