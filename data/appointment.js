const mongoCollections = require('../config/mongoCollections');
const appointment = mongoCollections.appointmentRequest;
const exportedMethods = {
    async createappointment(userName,date,queries,requestType){
        let CurrentDate = new Date();
        dateforValidation = new Date(date);
        if(dateforValidation<CurrentDate) throw "Please select different Date"

        if(!userName) throw "Please provide a Username"
        if(!date) throw "Please provide a Appointment Date"
        if(!queries) throw "Please provide Queries"

        let newrequest = {
            userName:userName,
            date:date,
            queries:queries,
            requestType:requestType
        }
        const appointmentCollection = await appointment();
        let insertInfo = await appointmentCollection.insertOne(newrequest);
        if(insertInfo.insertCount === 0){
            throw "Insertion failed";
        }
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