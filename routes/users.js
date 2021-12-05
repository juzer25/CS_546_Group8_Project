const express = require('express');
const router = express.Router();
const data = require('../data');
const broadbandData = require('../data/broadband');
const xss = require('xss');
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
                    zipcode: user.zipcode
                });
            }
        } catch (e) {
            res.status(404).json({ error: e })
        }
    }
    //res.render("users/login");
});

router.post('/signup', async(req, res) => {
    userName = xss(req.body.userName);
    password = xss(req.body.password);
    firstName = xss(req.body.firstName);
    lastName = xss(req.body.lastName);
    email = xss(req.body.email);
    dateOfBirth = xss(req.body.dateOfBirth);
    phoneNo = xss(req.body.phoneNo);
    address = xss(req.body.address);
    city = xss(req.body.city);
    state = xss(req.body.state);
    zipcode = xss(req.body.zipcode);

    if(!userName) {
        res.status(400).render("users/signup",
         {error:"Please provide a userName",userName:"",
         password:password, firstName:firstName, lastName:lastName,
        email:email, dateOfBirth:dateOfBirth,
    phoneNo:phoneNo, address:address,city:city,state:state,
    zipcode:zipcode});
        return;
    }

    if(userName.length < 4){
        res.status(400).render('users/signup',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    } 

    if(userName.trim().length === 0){
        res.status(400).render('users/signup',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    if(userName.includes(' ')){
        res.status(400).render('users/signup',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;

    if(reg.test(userName)){
        res.status(400).render('users/signup',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    if(!password) {
        res.status(400).render("users/signup", {error:"Please provide a password",userName:userName,
        password:"", firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(password.length < 6) {
        res.status(400).render('users/signup',{error: "Either the username and or password is invalid",userName:userName,
        password:'', firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(password.trim().length === 0){
        res.status(400).render('users/signup',{error: "Either the username and or password is invalid",userName:userName,
        password:'', firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    if(!firstName) {
        res.status(400).render("users/signup", {error:"Please provide a fullName",userName:userName,
        password:password, firstName:'', lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!lastName) {
        res.status(400).render("users/signup", {error:"Please provide a last name",userName:userName,
        password:password, firstName:firstName, lastName:'',
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!email) {
        res.status(400).render("users/signup", {error:"Please provide an email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(email.length === 0){
        res.status(400).render("users/signup", {error:"Please provide an email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(email.trim().length === 0){
        res.status(400).render("users/signup", {error:"Please provide an email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    //emailReg = /^[a-zA-Z0-9][(-|.|_|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
    emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailReg.test(email)){
        res.status(400).render("users/signup", {error:"Please provide a valid email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!dateOfBirth) {
        res.status(400).render("users/signup", {error:"Please provide a dateOfBirth",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:'',
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    d1 = new Date(dateOfBirth+" 00:00:00");
    d2 = new Date();
    diffDate = d2.getFullYear() - d1.getFullYear();
    if((d1 > d2 || d1 === d2)){
        res.status(400).render('users/signup', {error:"Date of birth is not valid",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:'',
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(diffDate < 18){
        res.status(400).render('users/signup', {error:"Date of birth is not valid user should be 18 or above",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:'',
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    
    }
   
    if(!phoneNo) {
        res.status(400).render("users/signup", {error:"Please provide a phoneNo",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(phoneNo.length === 0){
        res.status(400).render("users/signup", {error:"Please provide a phoneNo",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(phoneNo.trim().length === 0){
        res.status(400).render("users/signup", {error:"Please provide a phoneNo",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
    if(!val.test(phoneNo)){
        res.status(400).render("users/signup", {error:"Please provide a phoneNo in the format XXX-XXX-XXXX",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!address) {
        res.status(400).render("users/signup", {error:"Please provide a address",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:'',city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!city) {
        res.status(400).render("users/signup", {error:"Please provide a city",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:'',state:state,
   zipcode:zipcode});
        return;
    }

    if(!state) {
        res.status(400).render("users/signup", {error:"Please provide a state",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:'',
   zipcode:zipcode});
        return;
    }

    if(!zipcode) {
        res.status(400).render("users/signup", {error:"Please provide a zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    if(zipcode.length === 0){
        res.status(400).render("users/signup", {error:"Please provide a zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    if(zipcode.trim().length === 0){
        res.status(400).render("users/signup", {error:"Please provide a zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    zipReg = /\d{5}/;

    if(!zipReg.test(zipcode)){
        res.status(400).render("users/signup", {error:"Please provide a valid zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    try{
        check = await userData.checkUser(userName.toLowerCase(),password);
    }
    catch(e){
        res.status(400).render("users/signup", {error:"user already exists"});
    }

    try{
        userCreated = await userData.createUser(userName,password,firstName,lastName,email,dateOfBirth,phoneNo,address,city,state,zipcode);
        res.redirect('login');
    }
    catch(e){
        res.status(500).render("users/signup",{error:"Something went wrong"});
    }
});


router.post('/login', async(req, res) => {

    let userName = xss(req.body.userName);
    let password = xss(req.body.password);


    if(!userName){
        res.status(400).render('users/login',{error: "Either password or username is invalid"});
        return ;
    }

    if(userName.length < 4){
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    } 

    if(userName.trim().length === 0){
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    }

    if(userName.includes(' ')){
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    }

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;

    if(reg.test(userName)){
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    }

    if(!password) {
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    }

    if(password.length < 6) {
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    }

    if(password.trim().length === 0){
        res.status(400).render('users/login',{error:"Either the username and or password is invalid"});
        return ;
    }
    
    try {
        let user = await userData.checkUser(userName, password);
        if (user.authenticated) {
            req.session.user = { userName: userName.toLowerCase() };
            res.redirect("/");
        }
        else{
            res.status(404).render('users/login',{error:"No such user"});
            return;
        }

    } catch (e) {
        res.status(400).render('users/login');
    }

});


router.put('/update', async(req, res)=>{
    if (!req.session.user) {
        res.redirect('/');
    }

    userName = xss(req.body.userName);
    password = xss(req.body.password);
    firstName = xss(req.body.firstName);
    lastName = xss(req.body.lastName);
    email = xss(req.body.email);
    dateOfBirth = xss(req.body.dateOfBirth);
    phoneNo = xss(req.body.phoneNo);
    address = xss(req.body.address);
    city = xss(req.body.city);
    state = xss(req.body.state);
    zipcode = xss(req.body.zipcode);



    if(!userName) {
        res.status(400).render("users/update",
         {error:"Please provide a userName",userName:"",
         password:password, firstName:firstName, lastName:lastName,
        email:email, dateOfBirth:dateOfBirth,
    phoneNo:phoneNo, address:address,city:city,state:state,
    zipcode:zipcode});
        return;
    }

    if(userName.length < 4){
        res.status(400).render('users/update',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    } 

    if(userName.trim().length === 0){
        res.status(400).render('users/update',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    if(userName.includes(' ')){
        res.status(400).render('users/update',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;

    if(reg.test(userName)){
        res.status(400).render('users/update',{error:"Either the username and or password is invalid",userName:"",
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    if(!password) {
        res.status(400).render("users/update", {error:"Please provide a password",userName:userName,
        password:"", firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(password.length < 6) {
        res.status(400).render('users/update',{error: "Either the username and or password is invalid",userName:userName,
        password:'', firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(password.trim().length === 0){
        res.status(400).render('users/update',{error: "Either the username and or password is invalid",userName:userName,
        password:'', firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return ;
    }

    if(!firstName) {
        res.status(400).render("users/update", {error:"Please provide a fullName",userName:userName,
        password:password, firstName:'', lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!lastName) {
        res.status(400).render("users/update", {error:"Please provide a last name",userName:userName,
        password:password, firstName:firstName, lastName:'',
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!email) {
        res.status(400).render("users/update", {error:"Please provide an email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(email.length === 0){
        res.status(400).render("users/update", {error:"Please provide an email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(email.trim().length === 0){
        res.status(400).render("users/update", {error:"Please provide an email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    //emailReg = /^[a-zA-Z0-9][(-._|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
    emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailReg.test(email)){
        res.status(400).render("users/update", {error:"Please provide a valid email",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:'', dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!dateOfBirth) {
        res.status(400).render("users/update", {error:"Please provide a dateOfBirth",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:'',
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    d1 = new Date(dateOfBirth+" 00:00:00");
    d2 = new Date();
    diffDate = d2.getFullYear() - d1.getFullYear();
    if((d1 > d2 || d1 === d2)){
        res.status(400).render('users/signup', {error:"Date of birth is not valid",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:'',
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(diffDate < 18){
        res.status(400).render('users/signup', {error:"Date of birth is not valid user should be 18 or above",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:'',
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    
    }
    if(!phoneNo) {
        res.status(400).render("users/update", {error:"Please provide a phoneNo",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(phoneNo.length === 0){
        res.status(400).render("users/update", {error:"Please provide a phoneNo",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(phoneNo.trim().length === 0){
        res.status(400).render("users/update", {error:"Please provide a phoneNo",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
    if(!val.test(phoneNo)){
        res.status(400).render("users/update", {error:"Please provide a phoneNo in the format XXX-XXX-XXXX",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:'', address:address,city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!address) {
        res.status(400).render("users/update", {error:"Please provide a address",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:'',city:city,state:state,
   zipcode:zipcode});
        return;
    }

    if(!city) {
        res.status(400).render("users/update", {error:"Please provide a city",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:'',state:state,
   zipcode:zipcode});
        return;
    }

    if(!state) {
        res.status(400).render("users/update", {error:"Please provide a state",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:'',
   zipcode:zipcode});
        return;
    }

    if(!zipcode) {
        res.status(400).render("users/update", {error:"Please provide a zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    if(zipcode.length === 0){
        res.status(400).render("users/update", {error:"Please provide a zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    if(zipcode.trim().length === 0){
        res.status(400).render("users/update", {error:"Please provide a zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    zipReg = /\d{5}/;

    if(!zipReg.test(zipcode)){
        res.status(400).render("users/update", {error:"Please provide a valid zip code",userName:userName,
        password:password, firstName:firstName, lastName:lastName,
       email:email, dateOfBirth:dateOfBirth,
   phoneNo:phoneNo, address:address,city:city,state:state,
   zipcode:''});
        return;
    }

    //let updatedUser = {};
    /*let newUserName = req.body.userName.toLowerCase();
    let newPassword = req.body.password;
    let newFirstName = req.body.firstName;
    let newLastName = req.body.lastName;
    let newEmail = req.body.email;
    let newDateOfBirth = req.body.dateOfBirth;
    let newPhoneNo = req.body.phoneNo;
    let newAddress = req.body.address;
    let newCity = req.body.city;
    let newState = req.body.state;
    let newzipcode = req.body.zipcode;*/
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
        updatedUser.zipcode = newzipcode;*/
        let id = user._id.toString();
        let updatedUser = await userData.updateUser(id,userName,password,
            firstName,lastName,email,dateOfBirth,phoneNo,address,city,
            state,zipcode);
        if(updatedUser){
            if(userName !== req.session.user.userName ){
                req.session.user.userName = userName;
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
                zipcode: user.zipcode
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