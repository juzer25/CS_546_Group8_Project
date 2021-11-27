const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = data.broadband;

router.get('/', async (req,res) => {
    if(req.session.user){
        let userName = req.session.user.userName;;
        if(userName === "admin"){
            res.render('broadband/index', {userName:userName, isAdmin:true});
        }
        else{
            res.render('broadband/index', {userName:userName});
        }
    }
    else{
        res.render('broadband/index');
    }
    
});

module.exports = router;