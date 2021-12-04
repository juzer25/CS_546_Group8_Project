const express = require('express');
const router = express.Router();
const data = require('../data');
const { checkUser } = require('../data/users');
const broadbandData = require('../data/broadband');
const userData = data.users;


router.get('/signup', async(req, res) => {
    res.render("users/signup");
});

router.get('/login', async(req, res) => {
    res.render("users/login");
});

router.get('/update', async(req,res) => {
    if(!req.session.user){
        res.redirect('/');
    }
    else{
        try {
            let user = await userData.userProfile(req.session.user.userName);
            if (user) {
                res.render('users/update', {
                    userName: user.userName,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    phoneNo: user.phoneNo,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    zipCode: user.zipcode
                });
            }
        } catch (e) {
            res.status(404).json({ error: e })
        }
    }
    //res.render("users/login");
});

router.post('/signup', async(req, res) => {
    userName = req.body.userName;
    password = req.body.password;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
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

    if(!firstName) {
        res.status(400).render("users/signup", {error:"Please provide a fullName"});
        return;
    }

    if(!lastName) {
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
        userCreated = await userData.createUser(userName,password,firstName,lastName,email,dateOfBirth,phoneNo,address,city,state,zipCode);
        res.redirect('login');
    }
    catch(e){
        res.status(400).render("users/signup");
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


router.put('/update', async(req, res)=>{
    if (!req.session.user) {
        res.redirect('/');
    }
    //let updatedUser = {};
    let newUserName = req.body.userName.toLowerCase();
    let newPassword = req.body.password;
    let newFirstName = req.body.firstName;
    let newLastName = req.body.lastName;
    let newEmail = req.body.email;
    let newDateOfBirth = req.body.dateOfBirth;
    let newPhoneNo = req.body.phoneNo;
    let newAddress = req.body.address;
    let newCity = req.body.city;
    let newState = req.body.state;
    let newZipCode = req.body.zipCode;
    try{
        let user = await userData.userProfile(req.session.user.userName);
        //if(newUserName===user.userName && newPassword===user.password && )
        /*updatedUser.userName = newUserName;
        updatedUser.password = newPassword;
        updatedUser.fullName = newFullName;
        updatedUser.email = newEmail;
        updatedUser.dateOfBirth = newDateOfBirth;
        updatedUser.phoneNo = newPhoneNo;
        updatedUser.address = newAddress;
        updatedUser.city = newCity;
        updatedUser.state = newState;
        updatedUser.zipCode = newZipCode;*/
        let id = user._id.toString();
        let updatedUser = await userData.updateUser(id,newUserName,newPassword,
            newFirstName,newLastName,newEmail,newDateOfBirth,newPhoneNo,newAddress,newCity,
            newState,newZipCode);
        if(updatedUser){
            if(newUserName !== req.session.user.userName ){
                req.session.user.userName = newUserName;
            }
            res.render('users/updated');
        }
        
    }
    catch(e){
        res.sendStatus(500);
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
                firstName: user.firstName,
                lastName:user.lastName,
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

router.put('/checkout', async(req,res)=>{
    if(!req.session.user){
        res.redirect('/');
    }
    let user;
    let plan

    try{
        user = await userData.userProfile(req.session.user.userName);
    }
    catch(e){
        res.status(404);
    }

    let data = req.body;
    try{
        plan = await broadbandData.getPlan(data.planName);
    }
    catch(e)
    {
        res.status(404);
    }
    let updateUser
    try{
        updateUser = await userData.updatePlan(req.session.user.userName, plan, data.cardDetails);
    }
    catch(e){
        res.sendStatus(500);
    }

    let adduser;
    try{
        adduser = await broadbandData.addUser(user._id,plan);
    }
    catch(e)
    {
        res.status(404);
    }
    

    if(updateUser === true && adduser === true){
        //res.render('checkout/bill');
        res.json({ success: true});
    }

});

router.delete('/delete', async(req,res) => {
    let user;
    try{
       user = await userData.userProfile(req.session.user.userName);
    }
    catch(e){
        res.sendStatus(404);
    }
    try{
        id = user._id; 
        deletedUser = await deleteUser(id);
        if(deletedUser){
            if (req.session.user) {
                req.session.destroy();
                res.redirect('/');
            }
        }
        
    }
    catch(e){
        res.redirect('profile');
    }
})

module.exports = router;