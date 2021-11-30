const express = require('express');
const router = express.Router();
const data = require('../data');
const appointmentRequestData = data.appointment;
router.get('/appointment', async(req, res) => {
    res.render("appointment/newappointment")
});
router.get('/appointment/allappointments', async(req, res) => {
    res.render("appointment/allappointments");
});
router.post('/appointment/newappointment', async(req, res) => {
    userName=req.body.userName;
    date = req.body.date;
    queries = req.body.queries;
    requestType = req.body.requestType;
    try{
        let appointmentCreated = await appointmentRequestData.createappointment(userName,date,queries,requestType);
        res.redirect('allappointments');
    }
    catch(e){
        res.status(400).render("appointment/newappointment");
    }
});
module.exports = router;