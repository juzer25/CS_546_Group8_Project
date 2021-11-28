const express = require('express');
const router = express.Router();
const data = require('../data');
const appointmentRequestData = data.appointmentRequest;
router.post('/newrequest', async(req, res) => {
    date=req.body.date;
    queries=req.body.queries;
    requestType=req.body.requestType;
    try{
        userCreated = await appointmentRequestData.appointmentRequest(date,queries,requestType);
        res.redirect('index');
    }
    catch(e){
        res.status(400).render("appointmentrequest/newrequest");
    }
});


module.exports = router;