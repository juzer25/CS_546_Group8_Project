const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;

router.get('/', async (req,res) => {
    let userName;
    if(req.session.user){
        userName = req.session.user.userName;
    }
    else{
        res.render('broadband/index');
    }
   
    if(userName){
        res.render('broadband/index', {userName:userName});
    }else{
        
    }
    
})

module.exports = router;