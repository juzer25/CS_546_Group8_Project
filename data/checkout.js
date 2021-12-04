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

        
        let cardDetails = {
            nameOfCardHolder:nameOfCardHolder,
            cardNumber:cardNumber,
            expirationMonth:expirationMonth,
            expirationYear:expirationYear
        }
       // console.log(userName);
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