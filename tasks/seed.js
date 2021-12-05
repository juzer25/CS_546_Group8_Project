const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const broadband = data.broadband;

async function main(){
    const db = await dbConnection.connectToDb();
    //await db.dropDatabase();
    try{
        const admin = await users.createUser('admin','admin@123','admin','admin','admin@broadband.com','2000/08/25','111-222-3333','N/A','N/A','N/A','00000');
    }
    catch(e){
        console.log(e);
    }
   
    //const id = admin._id;

    console.log('Done seeding database');

    await dbConnection.closeConnection();

}


main();
