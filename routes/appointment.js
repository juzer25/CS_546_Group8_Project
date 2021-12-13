const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');


const appointmentRequestData = data.appointment;
router.get('/appointment', async(req, res) => {
    let isAdmin = false;
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    if (req.session.user.userName === "admin") {
        res.redirect('/');
        return;
    }
    res.render("appointment/newappointment", { userName: req.session.user.userName, isAdmin: isAdmin })
});

router.post('/appointment', async(req, res) => {
    userName = xss(req.body.Username);
    email = xss(req.body.email);
    date = xss(req.body.Date);
    queries = xss(req.body.Querise);
    requestType = xss(req.body.RequestType);
    // if(!userName) {
    //     res.status(400).render("appointment/newappointment", {error:"Please provide a Username"});
    //     return;
    // }
    if (!date) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide a Appointment Date",
            userName: userName,
            email: email,
            date: '',
            queries: queries,
            requestType: requestType
        });
        return;
    }
    if (!queries) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide Queries",
            userName: userName,
            email: email,
            date: date,
            queries: '',
            requestType: requestType
        });
        return;
    }
    if (email.length === 0) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide an email",
            userName: userName,
            email: '',
            date: date,
            queries: queries,
            requestType: requestType
        });
        return;
    }
    if (email.trim().length === 0) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide an email",
            userName: userName,
            email: '',
            date: date,
            queries: queries,
            requestType: requestType
        });
        return;
    }
    emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailReg.test(email)) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide an valid email",
            userName: userName,
            email: '',
            date: date,
            queries: queries,
            requestType: requestType
        });
        return;
    }
    if (date.length === 0) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide appointment date",
            userName: userName,
            email: email,
            date: '',
            queries: queries,
            requestType: requestType
        });
        return;
    }
    if (date.trim().length === 0) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide appointment date",
            userName: userName,
            email: email,
            date: '',
            queries: queries,
            requestType: requestType
        });
        return;
    }
    if (queries.length === 0) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide queries",
            userName: userName,
            email: email,
            date: date,
            queries: '',
            requestType: requestType
        });
        return;
    }
    if (queries.trim().length === 0) {
        res.status(400).render("appointment/newappointment", {
            error: "Please provide queries",
            userName: userName,
            email: email,
            date: date,
            queries: '',
            requestType: requestType
        });
        return;
    }

    let CurrentDate = new Date();
    dateforvalidation = new Date(date);
    if (dateforvalidation < CurrentDate) {
        res.status(400).render("appointment/newappointment", { error: "Please Select Different Date", userName: req.session.user.userName });
        return;
    }
    try {
        const newAppointment = await appointmentRequestData.createappointment(userName, email, date, queries, requestType);
        res.redirect('/');
    } catch (e) {
        res.status(400).render("appointment/newappointment", { userName: req.session.user.userName });
    }
});


router.get('/allappointments', async(req, res) => {
    let isAdmin = true;
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    if (req.session.user.userName !== 'admin') {
        isAdmin = false;
        res.redirect('/');
        return;
    }
    try {
        let apts = await appointmentRequestData.listappointmentRequest();
        res.render('appointment/allappointments', { userName: req.session.user.userName, isAdmin: isAdmin, AppointmentRequest: apts });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.get('/users/appointment', async(req, res) => {
    if (req.session.user) {
        let userappointment;
        let userName = req.session.user.userName;
        try {
            userappointment = await appointmentRequestData.requestOfuser(userName);
            res.render('appointment/viewappointments', { userName: userName, appointmentdate: userappointment, isAdmin: false });
            //res.render("broadband/index",{user:userName,appointmentdate:userappointment.date});
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});
module.exports = router;