const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const broadband = data.broadband;
const appointmentRequestData = data.appointment;

async function main() {
    const db = await dbConnection.connectToDb();
    //await db.dropDatabase();
    try {
        const admin = await users.createUser('admin', 'admin@123', 'admin', 'admin', 'admin@broadband.com', '2000/08/25', '111-222-3333', 'N/A', 'N/A', 'N/A', '00000');
    } catch (e) {
        console.log(e);
    }
    try {
        const user1 = await users.createUser('Kirtan', 'kirtan@123', 'Kirtan', 'Savani', 'kirtansavani@gmail.com', '2000/05/07', '222-333-4444', '87 Paterson', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const user2 = await users.createUser('Juzer', 'juzer@123', 'Juzer', 'Bhagat', 'Juzerbhagat@gmail.com', '1999/07/20', '254-555-9875', '55 Summit', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const user3 = await users.createUser('Mehul', 'Mehul@123', 'Mehul', 'Savaliya', 'mehulsavaliya520@gmail.com', '1999/09/10', '254-777-8755', '25 Liberty', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const user4 = await users.createUser('Shivank', 'shivank@123', 'Shivank', 'Gupta', 'shivankgupta@gmail.com', '2000/08/25', '101-222-3443', '80 Graham', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const user5 = await users.createUser('john', 'john@123', 'john', 'Dan', 'johnd07@gmail.com', '1995/02/05', '215-565-8546', '656 Liberty', 'hobokan', 'NJ', '07030');
    } catch (e) {
        console.log(e);
    }
    try {
        const user6 = await users.createUser('Robert', 'robert@123', 'robert', 'r', 'robertr@gmail.com', '2000/05/05', '215-565-8777', '78 Bleekar', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const user7 = await users.createUser('abraham', 'abraham@123', 'abraham', 'H', 'abrahamh@gmail.com', '1990/01/07', '215-555-8546', '787 Grace', 'hobokan', 'NJ', '07030');
    } catch (e) {
        console.log(e);
    }
    try {
        const user8 = await users.createUser('Michael', 'michael@123', 'Michael', 'H', 'Michaelh@gmail.com', '1998/05/01', '111-575-9546', '222 Beach', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const user9 = await users.createUser('James', 'james@123', 'James', 'J', 'jamesj@gmail.com', '1991', '111-001-9546', '99 South', 'Jersey City', 'NJ', '07307');
    } catch (e) {
        console.log(e);
    }
    try {
        const broadbandplan1 = await broadband.create('unlimited', '300', '3', 'Unlimited', '20');
    } catch (e) {
        console.log(e);
    }
    try {
        const broadbandplan2 = await broadband.create('December Special', '100', '1', 'Unlimited', '10');
    } catch (e) {
        console.log(e);
    }
    try {
        const broadbandplan3 = await broadband.create('NoLimit', '500', '6', 'Unlimited', '25');
    } catch (e) {
        console.log(e);
    }
    try {
        const broadbandplan4 = await broadband.create('New Year Special', '555', '12', 'Unlimited', '55');
    } catch (e) {
        console.log(e);
    }
    try {
        const broadbandplan5 = await broadband.create('Unlimited1', '100', '1', 'Unlimited', '0');
    } catch (e) {
        console.log(e);
    }
    try {
        const appointment1 = await appointmentRequestData.createappointment('Mehul', 'mehulsavaliya520@gmail.com', '2021-12-15', 'Technical Issue', 'New Appointment');
    } catch (e) {
        console.log(e);
    }
    try {
        const appointment2 = await appointmentRequestData.createappointment('kirtan', 'savanikirtan311@gmail.com', '2021-12-16', 'close plan', 'Others');
    } catch (e) {
        console.log(e);
    }
    try {
        const appointment3 = await appointmentRequestData.createappointment('Shivank', 'shivank@gmail.com', '2021-12-19', 'Technical Issue', 'Technical Issue');
    } catch (e) {
        console.log(e);
    }
    try {
        const appointment4 = await appointmentRequestData.createappointment('Juzer', 'juzerbhagat@gmail.com', '2021-12-26', 'Connection', 'Technical Issue');
    } catch (e) {
        console.log(e);
    }



    //const id = admin._id;

    console.log('Done seeding database');

    await dbConnection.closeConnection();

}


main();