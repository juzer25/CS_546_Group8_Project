const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const broadband = mongoCollections.broadbandPlans;
let {ObjectId} = require("mongodb");
const data = require('../data');
//const nodemailer = require("nodemailer");

const exportedMethods = {

    async requestOfuser(userName){
        const appointmentCollection = await appointment();
        let userrequest = await appointmentCollection.find({userName: userName}).toArray();
        if(!userrequest) throw "No request found";

        return userrequest;
    },
  
    async storeCardDetails(userName, nameOfCardHolder, cardNumber, expirationMonth, expirationYear){
       
    //     if(!userName) throw "Please provide a userName";
    //     if(!nameOfCardHolder) throw "Please provide a Card holder name";
    //     if(!cardNumber) throw "Please provide a card number";
    //     if(!expirationMonth) throw "Please provide a expiration month";
    //     if(!expirationYear) throw "Please provide a expiration year";


    // if(nameOfCardHolder.length === 0){
    //     throw "Please provide a card holder name";
    // }
    // if(nameOfCardHolder.trim().length === 0){
    //     throw "Please provide a card holder name";
    // }


    // if(cardNumber.length === 0) {
    //     throw "Please provide a card number";
    // }
    // if(cardNumber.trim().length === 0) {
    //     throw "Please provide a card number";
    // }
    // if(cardNumber.length !== 16) {
    //     throw"Please provide a valid card number";
    // }
    // if(typeof parseInt(cardNumber) !== 'number'){
    //     throw "Card number should be Interger";
    // }


    // if(expirationMonth.length === 0) {
    //     throw" Please provide a expiry Month";
    // }
    // if(expirationMonth.trim().length === 0) {
    //     throw "Please provide a expiry Month";
    // }
    // if(expirationMonth.length !== 2 && expirationMonth.length !== 1){
    //     throw "Please provide a valid expiry Month";
    // }
    // if(expirationMonth > 12){
    //     throw "Please provide a valid expiry Month";
    // }
    // if(typeof parseInt(expirationMonth) !== 'number'){
    //     throw "Expirt month should be Interger";
    // }


    // if(expirationYear.trim().length === 0) {
    //     throw "Please provide a expiry year";
    // }
    // if(expirationYear.length !== 2) {
    //     throw "Please provide a valid expiry year";
    // }
    // if(typeof parseInt(expirationYear) !== 'number'){
    //     throw "Expiry year should be Interger";
    // }

    //     let CurrentDate = new Date();
    //     let currYearStr = CurrentDate.getFullYear().toString();
    //     let expirationYearFourDigit = "20";
        
    //     if(expirationYear.length === 2){
    //         expirationYearFourDigit = expirationYearFourDigit + expirationYear;
    //     }

    //     if(expirationYearFourDigit < currYearStr)
    //         console.log("You card has been expired. Please use different card for payment");
    //     else if(parseInt(expirationYearFourDigit) > parseInt(currYearStr) + 10){
    //         console.log("Please use different card for payment. This card seems ambitious");
    //     }

        let cardDetails = {
            nameOfCardHolder:nameOfCardHolder,
            cardNumber:cardNumber,
            expirationMonth:expirationMonth,
            expirationYear:expirationYear
        }
       
        const userCollection = await users();
        const userData = await userCollection.findOne({ userName : userName });

        if (userData === null) throw 'No userData exists with this userName';
           
        userData.cardDetails.push(cardDetails);
        //console.log(userData);
        //console.log(userData.planSelected);
        //console.log(userData.planSelected[userData.planSelected.length-1].broadbandPlanId);
       // console.log(userData.cardDetails);
        // console.log(userData.expirationMonth);
        // console.log(userData.dateOfBirth);
        const userInsertInfo = await userCollection.updateOne( { userName : userName },
                                                                        { $set: userData });

           if (userInsertInfo.modifiedCount === 0) 
            throw 'Payment details could not be added';


            // var transporter = nodemailer.createTransport({
            //     service: "gmail",
            //     auth: {
            //       user: "mybroadband47@gmail.com",
            //       pass: "mybroadband@123",
            //     },
            //   });
            //   let CurrentDate = new Date();
            //   let currDateString = CurrentDate.toString();
  
            //   let orderId = Date.now();
            //   let user = "shivank";
            //   console.log("11");
            //   data = "check";

            //   console.log("22");
            //   var mailOptions = {
            //     from: "mybroadband47@gmail.com",
            //     to: email,
            //     subject: "BroadBand Invoice",
            //     text: data
            //   };
            //   console.log("33");
            //   transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log("Email sent: " + info.response);
            //     }
            //   });
    },

    async getBroadbandPlanById(Id) {
        const broadbandCollection = await broadband();
       
        let planDetails = await broadbandCollection.findOne({ _id: ObjectId(Id) });

        if (!planDetails) throw "Plan not found";
        //console.log(planDetails);
        return planDetails;
    }
  
    // async storeCardDetails(firstName, lastName, address, city, state, zipCode, email){

    //     let cardDeatils = {
    //         firstName:firstName,
    //         lastName:lastName,
    //         address:address,
    //         city:city,
    //         state:state,
    //         zipCode:zipCode,
    //         email:email

    //     }
    
    // }
 



};

module.exports = exportedMethods;