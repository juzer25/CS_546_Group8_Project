const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require("mongodb");

const exportedMethods = {
  
    async storeCardDetails(userName, nameOfCardHolder, cardNumber, expirationMonth, expirationYear){
       
        if(!userName) throw "Please provide a userName";
        if(!nameOfCardHolder) throw "Please provide a Card holder name";
        if(!cardNumber) throw "Please provide a card number";
        if(!expirationMonth) throw "Please provide a expiration month";
        if(!expirationYear) throw "Please provide a expiration year";


    if(nameOfCardHolder.length === 0){
        throw "Please provide a card holder name";
    }
    if(nameOfCardHolder.trim().length === 0){
        throw "Please provide a card holder name";
    }


    if(cardNumber.length === 0) {
        throw "Please provide a card number";
    }
    if(cardNumber.trim().length === 0) {
        throw "Please provide a card number";
    }
    if(cardNumber.length !== 16) {
        throw"Please provide a valid card number";
    }
    if(typeof parseInt(cardNumber) !== 'number'){
        throw "Card number should be Interger";
    }


    if(expirationMonth.length === 0) {
        throw" Please provide a expiry Month";
    }
    if(expirationMonth.trim().length === 0) {
        throw "Please provide a expiry Month";
    }
    if(expirationMonth.length !== 2 && expirationMonth.length !== 1){
        throw "Please provide a valid expiry Month";
    }
    if(expirationMonth > 12){
        throw "Please provide a valid expiry Month";
    }
    if(typeof parseInt(expirationMonth) !== 'number'){
        throw "Expirt month should be Interger";
    }


    if(expirationYear.trim().length === 0) {
        throw "Please provide a expiry year";
    }
    if(expirationYear.length !== 2) {
        throw "Please provide a valid expiry year";
    }
    if(typeof parseInt(expirationYear) !== 'number'){
        throw "Expiry year should be Interger";
    }

        //console.log(expirationYear);
        let CurrentDate = new Date();
        let currYearStr = CurrentDate.getFullYear().toString();
        //let curr_date_str = CurrentDate.toString();
        // console.log(CurrentDate);
        // console.log(CurrentDate.getFullYear());
        
        //let yearValidation = CurrentDate.getFullYear().toString();
       // yearValidation = yearValidationtion.toString();
        //console.log(yearValidation);
        //yearValidation = yearValidation[2] + yearValidation[3];
        let expirationYearFourDigit = "20";
        
        if(expirationYear.length === 2){
            expirationYearFourDigit = expirationYearFourDigit + expirationYear;
        }

        // console.log(expirationYearFourDigit);
        // console.log(currYearStr);
        if(expirationYearFourDigit < currYearStr)
            console.log("You card has been expired. Please use different card for payment");
        else if(parseInt(expirationYearFourDigit) > parseInt(currYearStr) + 10){
            console.log("Please use different card for payment. This card seems ambitious");
        }
        //console.log(parseInt(expirationYearFourDigit), parseInt(currYearStr) + 10);
        // console.log(expirationYear);
        // console.log(yearValidation);
        //console.log(CurrentDate.getUTCFullYear());

        let cardDetails = {
            nameOfCardHolder:nameOfCardHolder,
            cardNumber:cardNumber,
            expirationMonth:expirationMonth,
            expirationYear:expirationYear
        }
        //console.log(userName);
        const userCollection = await users();
        const userData = await userCollection.findOne({ userName : userName });

        if (userData === null) throw 'No userData exists with this userName';
           
        userData.cardDetails.push(cardDetails);
        //console.log(userData);

        const userInsertInfo = await userCollection.updateOne( { userName : userName },
                                                                        { $set: userData });

           if (userInsertInfo.modifiedCount === 0) 
            throw 'Payment details could not be added';
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