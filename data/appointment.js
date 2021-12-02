const mongoCollections = require('../config/mongoCollections');
const appointment = mongoCollections.appointmentRequest;
const exportedMethods = {
    async createappointment(userName,date,queries,requestType){
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
        return {userInserted: true};
    },
    async listappointmentRequest(){
        const appointmentCollection = await appointment();
        let appointments = await appointmentCollection.find({}).toArray();
        if(!appointments) throw "No Appointment found";
        return appointments;
    }



    
};
module.exports = exportedMethods;