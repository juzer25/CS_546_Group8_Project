const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require("mongodb");

const exportedMethods = {
  
    async storeCardDetails(userId, nameOfCardHolder, cardNumber, expirationMonth, expirationYear){
        console.log("1");
        let cardDeatils = {
            nameOfCardHolder:nameOfCardHolder,
            cardNumber:cardNumber,
            expirationMonth:expirationMonth,
            expirationYear:expirationYear
        }

        const userData = await users();
        console.log(req.body.userName);
    
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