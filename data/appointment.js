const mongoCollections = require('../config/mongoCollections');
const appointment = mongoCollections.appointmentRequest;
const nodemailer = require("nodemailer");
const { text } = require('express');
const exportedMethods = {
    async createappointment(userName,email,date,queries,requestType){
        let CurrentDate = new Date();
        dateforValidation = new Date(date);
        if(dateforValidation<CurrentDate) throw "Please select different Date"

        if(!userName) throw "Please provide a Username"
        if(!email) throw "Please provide emailId"
        if(!date) throw "Please provide a Appointment Date"
        if(!queries) throw "Please provide Queries"

        
        
        if(email.length === 0) throw "Please provide an email"

        if(email.trim().length === 0) throw "Please provide an email";

        emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailReg.test(email)){
          throw "Please provide a valid email"
        }
        
        if(date.length === 0) throw "Please provide appointment date"

        if(date.trim().length === 0 )throw "Please provide appointment date";

    
        

        if(queries.length === 0) throw "Please provide Queries"

        if(queries.trim().length === 0) throw "Please provide Queries"

        let newrequest = {
            userName:userName,
            email:email,
            date:date,
            queries:queries,
            requestType:requestType
        }
        const appointmentCollection = await appointment();
        let insertInfo = await appointmentCollection.insertOne(newrequest);
        if(insertInfo.insertCount === 0){
            throw "Insertion failed";
        }
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "mybroadband47@gmail.com",
              pass: "mybroadband@123",
            },
          });
        
          var mailOptions = {
            from: "mybroadband47@gmail.com",
            to: email,
            subject: "Your appointment created successfully",
            text: `Hey ${userName} your appointment is successfully created on ${newrequest.date}`
          };
        
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        return {appointmentInserted:true};
    },
    async listappointmentRequest(){
        const appointmentCollection = await appointment();
        let appointments = await appointmentCollection.find({}).toArray();
        if(!appointments) throw "No Appointment found";
        return appointments;
    },
    async requestOfuser(userName){
        const appointmentCollection = await appointment();
        let userrequest = await appointmentCollection.find({userName: userName}).toArray();
        if(!userrequest) throw "No request found";

        return userrequest;


    }
};
module.exports = exportedMethods;