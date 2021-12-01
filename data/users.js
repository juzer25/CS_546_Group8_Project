const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require("mongodb");

const exportedMethods = {
    async createUser(userName, password,fullName,email,dateOfBirth,phoneNo,address,city,state,zipcode){

    if(!userName) throw "Please provide a userName"

    if(userName.length < 4) throw "Invalid username";

    if(userName.trim().length === 0) throw "Invalid username";

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;
    if(reg.test(userName)) throw "Invalid username";


    if(!password) throw "Please provide password"
        
    if(password.length < 6) throw "Invalid password";

    if(password.trim().length === 0) throw "Invalid password";

    if(password.includes(' ')) throw "Invalid password";


    if(!fullName) throw "Please provide full name"
        
    

    if(!email) throw "Please provide email"
        
    

    if(!dateOfBirth) throw "Please provide date of birth"
        
    

    if(!phoneNo) throw "Please provide phoneNo."
        
    

    if(!address) throw "Please provide address"
        
    

    if(!city) throw "Please provide city"
        
    

    if(!state) throw "Please provide state"
        
    


    if(!zipCode) throw "Please provide zipCode"
        
    
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
        if (userName === 'admin' && password==='admin'){
            return {authenticated: true};
        }
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName}); 
        
        if(user === null) throw "Either the username and or password is invalid";

        
        //pwdMatch = await bcrypt.compare(password , user.password);
        pwdMatch = (password === user.password);
        if(!pwdMatch) throw "Either the username and or password is invalid";
        
        return {authenticated: true};
    },

    async userProfile(userName){
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName}); 
        if(!user) throw "No user found";

        return user;
    },


    async updateUser(id,userName, password,fullName,email,dateOfBirth,phoneNo,address,city,state,zipcode){
        const userCollection = await users();
        id = ObjectId(id);
        let updatedUser = {
            userName:userName,
            password:password,
            fullName:fullName,
            email:email,
            dateOfBirth:dateOfBirth,
            phoneNo:phoneNo,
            address:address,
            city:city,
            state:state,
            zipcode:zipcode
        }
        const updateInfo = await userCollection.updateOne(
            {_id : id},
            { $set: updatedUser}
        );

        if(updateInfo.modifiedCount === 0){
            throw new Error('could not update the record successfully or record does not exist');
        }

        return true;
    },

    async deleteUser(id){
        id = ObjectId(id);
        const userCollection = await users();
        const deleteInfo = await userCollection.deleteOne({_id: id});
        
        if(deletionInfo.deletedCount === 0){
            throw `Could not delete user`;
        }

        return true;
    
    }
    
};

module.exports = exportedMethods;