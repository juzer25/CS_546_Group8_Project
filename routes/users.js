const express = require('express');
const router = express.Router();
const data = require('../data');
const { checkUser } = require('../data/users');
const userData = data.users;

router.get('/signup',async(req,res)=>{
    res.render("users/signup");
});

router.get('/login',async(req,res)=>{
    res.render("users/login");
})

router.post('/signup', async(req,res)=>{
    userName = req.body.userName;
    password = req.body.password;
    fullName = req.body.fullName;
    email = req.body.email;
    dateOfBirth = req.body.dateOfBirth;
    phoneNo = req.body.phoneNo;
    address = req.body.address;
    city = req.body.city;
    state = req.body.state;
    zipCode = req.body.zipCode;

    try{
        userCreated = await userData.createUser(userName,password,fullName,email,dateOfBirth,phoneNo,address,city,state,zipCode);
        res.redirect('/login');
    }
    catch(e){
        res.status(400).render("user/signup");
    }
});


router.post('/login',async (req,res)=>{
    let userName = req.body.userName;
    let password = req.body.password;

    try{
        let user = await userData.checkUser(userName,password);
        if(user.authenticated){
            res.render("broadband/index");
        }
        
    }catch(e){
        res.status(400).render('users/login');
    }

});

module.exports = router;