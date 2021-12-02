const express = require('express');
const router = express.Router();
const data = require('../data');
const appointmentRequestData = data.appointment;
router.get('/appointment', async(req, res) => {
    res.render("appointment/newappointment")
});

router.post('/appointment', async(req, res) => {
    userName=req.body.Username;
    date = req.body.Date;
    queries = req.body.Querise;
    requestType = req.body.RequestType;
    try{
        const newAppointment = await appointmentRequestData.createappointment(userName,date,queries,requestType);
        res.redirect('allappointments');
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