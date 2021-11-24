const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

const exportedMethods = {
    async createUser(userName, password,fullName,email,dateOfBirth,phoneNo,address,city,state,zipcode){
        let newUser = {
            userName:userName,
            password:password,
            fullName:fullName,
            email:email,
            dateOfBirth:dateOfBirth,
            phoneNo:phoneNo,
            address:address,
            city:city,
            state:state,
            zipcode:zipcode,
            cardDetails:[],
            planSelected:[]
        } 

        const userCollection = await users();

        let insertInfo = await userCollection.insertOne(newUser);

        if(insertInfo.insertCount === 0){
            throw "Insertion failed";
        }

        return {userInserted: true};
    },

    async checkUser(userName , password){
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName}); 
        
        if(user === null) throw "Either the username and or password is invalid";

        
        //pwdMatch = await bcrypt.compare(password , user.password);
        pwdMatch = (password === user.password);
        if(!pwdMatch) throw "Either the username and or password is invalid";
        
        return {authenticated: true};
    }
    
};

module.exports = exportedMethods;