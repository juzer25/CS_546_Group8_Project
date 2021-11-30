const mongoCollections = require('../config/mongoCollections');
const appointment = mongoCollections.appointmentRequest;
const exportedMethods = {
    async createappointment(userName,date,queries,requestType){
        let newrequest = {
            userName:userName,
            date:date,
            queries:queries,
            requestType:requestType
        }
        const userCollection = await appointment();
        let insertInfo = await userCollection.insertOne(newrequest);
        return {userInserted: true};
    }
};
module.exports = exportedMethods;