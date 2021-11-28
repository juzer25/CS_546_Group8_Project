const express = require('express');
const router = express.Router();
const data = require('../data');
const { checkUser } = require('../data/users');
const userData = data.users;

router.get('/signup', async(req, res) => {
    res.render("users/signup");
});

router.get('/login', async(req, res) => {
    res.render("users/login");
})

router.post('/signup', async(req, res) => {
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

    if(!userName) {
        res.status(400).render("users/signup", {error:"Please provide a userName"});
        return;
    }

    if(userName.length < 4){
        res.status(400).render('users/index',{error:"Either the username and or password is invalid"});
        return ;
    } 

    if(userName.trim().length === 0){
        res.status(400).render('users/index',{error:"Either the username and or password is invalid"});
        return ;
    }

    if(userName.includes(' ')){
        res.status(400).render('users/signup',{error:"Either the username and or password is invalid"});
        return ;
    }

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;

    if(reg.test(userName)){
        res.status(400).render('users/index',{error:"Either the username and or password is invalid"});
        return ;
    }

    if(!password) {
        res.status(400).render("users/signup", {error:"Please provide a password"});
        return;
    }

    if(password.length < 6) {
        res.status(400).render('users/index',{error: "Either the username and or password is invalid"});
        return;
    }

    if(password.trim().length === 0){
        res.status(400).render('users/index',{error: "Either the username and or password is invalid"});
        return ;
    }

    if(!fullName) {
        res.status(400).render("users/signup", {error:"Please provide a fullName"});
        return;
    }

    if(!email) {
        res.status(400).render("users/signup", {error:"Please provide a email"});
        return;
    }

    if(!dateOfBirth) {
        res.status(400).render("users/signup", {error:"Please provide a dateOfBirth"});
        return;
    }

    if(!phoneNo) {
        res.status(400).render("users/signup", {error:"Please provide a phoneNo"});
        return;
    }

    if(!address) {
        res.status(400).render("users/signup", {error:"Please provide a address"});
        return;
    }

    if(!city) {
        res.status(400).render("users/signup", {error:"Please provide a city"});
        return;
    }

    if(!state) {
        res.status(400).render("users/signup", {error:"Please provide a state"});
        return;
    }

    if(!zipCode) {
        res.status(400).render("users/signup", {error:"Please provide a zip code"});
        return;
    }
    try{
        userCreated = await userData.createUser(userName,password,fullName,email,dateOfBirth,phoneNo,address,city,state,zipCode);
        res.redirect('login');
    }
    catch(e){
        res.status(400).render("user/signup");
    }
});


router.post('/login', async(req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    try {
        let user = await userData.checkUser(userName, password);
        if (user.authenticated) {
            req.session.user = { userName: userName.toLowerCase() };
            res.redirect("/");
        }

    } catch (e) {
        res.status(400).render('users/login');
    }

});


router.get('/profile', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/');
    }

    try {
        let user = await userData.userProfile(req.session.user.userName);
        if (user) {
            res.render('users/profile', {
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                phoneNo: user.phoneNo,
                address: user.address,
                city: user.city,
                state: user.state,
                zipCode: user.zipcode
            })
        }
    } catch (e) {
        res.status(404).json({ error: e })
    }
});

router.get('/logout', async(req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.redirect('/');
    }

});

module.exports = router;