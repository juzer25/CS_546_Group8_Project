const express = require('express');
const router = express.Router();
const data = require('../data');
const appointmentRequestData = data.appointment;
router.get('/appointment', async(req, res) => {
    if(!req.session.user){
        res.redirect('/');
    }
    res.render("appointment/newappointment",{userName:req.session.user.userName})
});

router.post('/appointment', async(req, res) => {
    userName=req.body.Username;
    email=req.body.email;
    date = req.body.Date;
    queries = req.body.Querise;
    requestType = req.body.RequestType;
    if(!userName) {
        res.status(400).render("appointment/newappointment", {error:"Please provide a Username"});
        return;
    }
    if(!date) {
        res.status(400).render("appointment/newappointment", {error:"Please provide a Appointment Date"});
        return;
    }
    if(!queries) {
        res.status(400).render("appointment/newappointment", {error:"Please provide Queries"});
        return;
    }
    let CurrentDate = new Date();
    dateforvalidation = new Date(date);
    if(dateforvalidation<CurrentDate){
        res.status(400).render("appointment/newappointment", {error:"Please Select Different Date" ,userName:req.session.user.userName});
        return;
    }
    try{
        const newAppointment = await appointmentRequestData.createappointment(userName,email,date,queries,requestType);
        res.redirect('/');
    }
    catch(e){
        res.status(400).render("appointment/newappointment");
    }
});


router.get('/allappointments', async(req, res) => {
    try{
        let apts = await appointmentRequestData.listappointmentRequest();
        res.render('appointment/allappointments', {AppointmentRequest:apts});
    }
    catch(e){
        res.status(500).json({ error: e });
    }
});

module.exports = router;