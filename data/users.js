const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

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
    }
    
};

module.exports = exportedMethods;