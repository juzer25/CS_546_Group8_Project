const mongoCollections = require('../config/mongoCollections');
const bcrypt = require('bcrypt');
const users = mongoCollections.users;
let {ObjectId} = require("mongodb");

const saltRounds = 16;

const exportedMethods = {
    async createUser(userName, password,firstName,lastName,email,dateOfBirth,phoneNo,address,city,state,zipcode){

    if(!userName) throw "Please provide a userName"
    
    if(userName.length < 4) throw "Invalid username";

    if(userName.trim().length === 0) throw "Invalid username";

    userName = userName.toLowerCase();

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;
    if(reg.test(userName)) throw "Invalid username";


    if(!password) throw "Please provide password"
        
    if(password.length < 6) throw "Invalid password";

    if(password.trim().length === 0) throw "Invalid password";

    if(password.includes(' ')) throw "Invalid password";


    if(!firstName) throw "Please provide full name";

    if(firstName.length === 0) throw "Please provide full name";
        
    if(firstName.trim().length === 0) throw "Please provide full name";

    if(!lastName) throw "Please provide Last name"

    if(!lastName.length === 0) throw "Please provide Last name"

    if(!lastName.trim().length === 0) throw "Please provide Last name"

    if(!email) throw "Please provide an email"
        
    if(email.length === 0) throw "Please provide an email"

    if(email.trim().length === 0) throw "Please provide an email";

    //emailReg = /^[a-zA-Z0-9][(-._|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
    emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailReg.test(email)){
        throw "Please provide a valid email"
    }
    
    if(!dateOfBirth) throw "Please provide date of birth"
        
    if(dateOfBirth.length === 0) throw "Please provide date of birth"

    if(dateOfBirth.trim().length === 0 )throw "Please provide date of birth";

    d1 = new Date(dateOfBirth+" 00:00:00");
    d2 = new Date();
    diffDate = d2.getFullYear() - d1.getFullYear();
    if(d1 > d2 || d1 === d2){
        throw "Please provide a valid date of birth";
    }

    if(diffDate < 18){
        throw "Date of birth is not valid user should be 18 or above"
    }
    
    if(!phoneNo) throw "Please provide phoneNo."
        
    if(phoneNo.length === 0) throw "Please provide phoneNo."    

    if(phoneNo.trim().length === 0) throw "Please provide phoneNo."
    
    let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
    if(!val.test(phoneNo)){
        throw "Please provide a valid phone number";
    }
    
    if(!address) throw "Please provide address"
        
    if(address.length === 0) throw "Please provide address"
    
    if(address.trim().length === 0) throw "Please provide address"
    

    if(!city) throw "Please provide city"
        
    if(city.length === 0) throw "Please provide city"

    if(city.trim().length === 0) throw "Please provide city"

    if(!state) throw "Please provide state"
        
    if(state.length === 0) throw "Please provide state"

    if(!state.trim().length === 0) throw "Please provide state"

    if(!zipcode) throw "Please provide zipcode"
    
    if(zipcode.length === 0) throw "Please provide zipcode"

    if(zipcode.trim().length === 0) throw "Please provide zipcode"
    
    zipReg = /\d{5}/;

    if(!zipReg.test(zipcode)){
        throw "Please provide a valid zipcode";
    }

    let hashedpwd = await bcrypt.hash(password,saltRounds);
    
        let newUser = {
            userName:userName.toLowerCase(),
            password:hashedpwd,
            firstName:firstName,
            lastName : lastName,
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
        let userExist = await userCollection.findOne({userName: userName});
        if(userExist){
            throw "User already exists";
        }
        let insertInfo = await userCollection.insertOne(newUser);

        if(insertInfo.insertCount === 0){
            throw "Insertion failed";
        }

        return {userInserted: true};
    },

    async checkUser(userName , password){
        /**
         * this is a temporary code. Will remove code after 
         * seed file is made.
         */
        /*if (userName === 'admin' && password==='admin'){
            return {authenticated: true};
        }*/
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName.toLowerCase()}); 
        
        if(user === null) return {authenticated: false};

        
        //pwdMatch = await bcrypt.compare(password , user.password);
        //pwdMatch = (password === user.password);
        pwdMatch = await bcrypt.compare(password , user.password);
        
        if(!pwdMatch) throw "Either the username and or password is invalid";
         
        return {authenticated: true};
    },

    async userProfile(userName){
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName}); 
        if(!user) throw "No user found";
        
        return user;
    },


    async updateUser(id,userName, password,firstName,lastName,email,dateOfBirth,phoneNo,address,city,state,zipcode){
        
        if(!userName) throw "Please provide a userName"

    if(userName.length < 4) throw "Invalid username";

    if(userName.trim().length === 0) throw "Invalid username";

    let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;
    if(reg.test(userName)) throw "Invalid username";


    if(!password) throw "Please provide password"
        
    if(password.length < 6) throw "Invalid password";

    if(password.trim().length === 0) throw "Invalid password";

    if(password.includes(' ')) throw "Invalid password";


    if(!firstName) throw "Please provide full name";

    if(firstName.length === 0) throw "Please provide full name";
        
    if(firstName.trim().length === 0) throw "Please provide full name";

    if(!lastName) throw "Please provide Last name"

    if(!lastName.length === 0) throw "Please provide Last name"

    if(!lastName.trim().length === 0) throw "Please provide Last name"

    if(!email) throw "Please provide an email"
        
    if(email.length === 0) throw "Please provide an email"

    if(email.trim().length === 0) throw "Please provide an email";

    //emailReg = /^[a-zA-Z0-9][(-._|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
    emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailReg.test(email)){
        throw "Please provide a valid email"
    }
    
    if(!dateOfBirth) throw "Please provide date of birth"
        
    if(dateOfBirth.length === 0) throw "Please provide date of birth"

    if(dateOfBirth.trim().length === 0 )throw "Please provide date of birth";

    d1 = new Date(dateOfBirth+" 00:00:00");
    d2 = new Date();
    diffDate = d2.getFullYear() - d1.getFullYear();
    if(d1 > d2 || d1 === d2){
        throw "Please provide a valid date of birth";
    }

    if(diffDate < 18){
        throw "Date of birth is not valid user should be 18 or above"
    }
    
    if(!phoneNo) throw "Please provide phoneNo."
        
    if(phoneNo.length === 0) throw "Please provide phoneNo."    

    if(phoneNo.trim().length === 0) throw "Please provide phoneNo."
    
    let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
    if(!val.test(phoneNo)){
        throw "Please provide a valid phone number";
    }
    
    if(!address) throw "Please provide address"
        
    if(address.length === 0) throw "Please provide address"
    
    if(address.trim().length === 0) throw "Please provide address"
    

    if(!city) throw "Please provide city"
        
    if(city.length === 0) throw "Please provide city"

    if(city.trim().length === 0) throw "Please provide city"

    if(!state) throw "Please provide state"
        
    if(state.length === 0) throw "Please provide state"

    if(!state.trim().length === 0) throw "Please provide state"

    if(!zipcode) throw "Please provide zipcode"
    
    if(zipcode.length === 0) throw "Please provide zipcode"

    if(zipcode.trim().length === 0) throw "Please provide zipcode"
    
    zipReg = /\d{5}/;

    if(!zipReg.test(zipcode)){
        throw "Please provide a valid zipcode";
    }
        
        const userCollection = await users();
        id = ObjectId(id);
        const user = await this.userProfile(userName);

        pwdMatch = await bcrypt.compare(password , user.password);
        
        if(!pwdMatch){
            password = await bcrypt.hash(password,saltRounds);
    
        }

        let updatedUser = {
            userName:userName,
            password:password,
            firstName:firstName,
            lastName:lastName,
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

    async updatePlan(userName,plan,cardDetails){
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName}); 
        selected = {
            "broadbandPlanId": plan._id,
            "startDate":new Date().toString(),
            "endData":plan.validity
        }

        for(let e of user.planSelected){
            let pid = plan._id;
            if(pid.toString() === e.broadbandPlanId.toString()){
               throw "Plan already selected";
            }
       }

        user.planSelected.push(selected);
        user.cardDetails.push(cardDetails);

        const updateInfo = await userCollection.updateOne(
            {_id : user._id},
            { $set: {planSelected:user.planSelected,cardDetails:user.cardDetails}}
        );

        if(updateInfo.modifiedCount === 0){
            throw new Error('could not update the record successfully or record does not exist');
        }

        return true;
    },

    async removePlan(userName , planId){
        const userCollection = await users();
        let user = await userCollection.findOne({userName: userName}); 
        for(let plans of user.planSelected){
            if(planId === plans.broadbandPlanId.toString()){
                let i = user.planSelected.indexOf(plans);
                user.planSelected.splice(i,1);
            }
        }

        const updateInfo = await userCollection.updateOne(
            {_id : user._id},
            { $set: {planSelected:user.planSelected}}
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