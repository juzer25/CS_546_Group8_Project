const { appointmentRequest } = require('../config/mongoCollections');
const mongoCollections = require('../config/mongoCollections');
const broadband = mongoCollections.appointmentRequest;
const exportedMethods = {
    async appointmentRequest(date,queries,requestType){
        let newrequest = {
            date:date,
            queries:queries,
            requestType:requestType
        } 
        const userCollection = await broadband();

        let insertInfo = await userCollection.insertOne(newrequest);

        return {userInserted: true};
    }
};

module.exports = exportedMethods;