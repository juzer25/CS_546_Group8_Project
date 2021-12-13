const mongoCollections = require('../config/mongoCollections');
const bcrypt = require('bcrypt');
const users = mongoCollections.users;
let { ObjectId } = require("mongodb");
let referralCodeGenerator = require('referral-code-generator');
const nodemailer = require("nodemailer");

const saltRounds = 16;

const exportedMethods = {
    async createUser(userName, password, firstName, lastName, email, dateOfBirth, phoneNo, address, city, state, zipcode) {

        if (!userName) throw "Please provide a userName"

        if (userName.length < 4) throw "Invalid username";

        if (userName.trim().length === 0) throw "Invalid username";

        userName = userName.toLowerCase();

        let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;
        if (reg.test(userName)) throw "Invalid username";


        if (!password) throw "Please provide password"

        if (password.length < 6) throw "Invalid password";

        if (password.trim().length === 0) throw "Invalid password";

        if (password.includes(' ')) throw "Invalid password";


        if (!firstName) throw "Please provide full name";

        if (firstName.length === 0) throw "Please provide full name";

        if (firstName.trim().length === 0) throw "Please provide full name";

        if (!lastName) throw "Please provide Last name"

        if (!lastName.length === 0) throw "Please provide Last name"

        if (!lastName.trim().length === 0) throw "Please provide Last name"

        if (!email) throw "Please provide an email"

        if (email.length === 0) throw "Please provide an email"

        if (email.trim().length === 0) throw "Please provide an email";

        //emailReg = /^[a-zA-Z0-9][(-._|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
        emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailReg.test(email)) {
            throw "Please provide a valid email"
        }

        if (!dateOfBirth) throw "Please provide date of birth"

        if (dateOfBirth.length === 0) throw "Please provide date of birth"

        if (dateOfBirth.trim().length === 0) throw "Please provide date of birth";

        d1 = new Date(dateOfBirth + " 00:00:00");
        d2 = new Date();
        diffDate = d2.getFullYear() - d1.getFullYear();
        if (d1 > d2 || d1 === d2) {
            throw "Please provide a valid date of birth";
        }

        if (diffDate < 18) {
            throw "Date of birth is not valid user should be 18 or above"
        }

        if (!phoneNo) throw "Please provide phoneNo."

        if (phoneNo.length === 0) throw "Please provide phoneNo."

        if (phoneNo.trim().length === 0) throw "Please provide phoneNo."

        let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
        if (!val.test(phoneNo)) {
            throw "Please provide a valid phone number";
        }

        if (!address) throw "Please provide address"

        if (address.length === 0) throw "Please provide address"

        if (address.trim().length === 0) throw "Please provide address"


        if (!city) throw "Please provide city"

        if (city.length === 0) throw "Please provide city"

        if (city.trim().length === 0) throw "Please provide city"

        if (!state) throw "Please provide state"

        if (state.length === 0) throw "Please provide state"

        if (!state.trim().length === 0) throw "Please provide state"

        if (!zipcode) throw "Please provide zipcode"

        if (zipcode.length === 0) throw "Please provide zipcode"

        if (zipcode.trim().length === 0) throw "Please provide zipcode"

        zipReg = /\d{5}/;

        if (!zipReg.test(zipcode)) {
            throw "Please provide a valid zipcode";
        }
        let refercode = referralCodeGenerator.alpha('lowercase', 12)

        let hashedpwd = await bcrypt.hash(password, saltRounds);


        let isAdmin = false;
        let newUser = {
            userName: userName.toLowerCase(),
            password: hashedpwd,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            phoneNo: phoneNo,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            cardDetails: [],
            planSelected: [],
            refercode: refercode,
            isAdmin: isAdmin
        }

        const userCollection = await users();
        let userExist = await userCollection.findOne({ userName: userName });
        if (userExist) {
            throw "User already exists";
        }
        let insertInfo = await userCollection.insertOne(newUser);

        if (insertInfo.insertCount === 0) {
            throw "Insertion failed";
        }

        return { userInserted: true };
    },

    async checkUser(userName, password) {
        /**
         * this is a temporary code. Will remove code after 
         * seed file is made.
         */
        /*if (userName === 'admin' && password==='admin'){
            return {authenticated: true};
        }*/
        const userCollection = await users();
        let user = await userCollection.findOne({ userName: userName.toLowerCase() });

        if (user === null) return { authenticated: false };


        //pwdMatch = await bcrypt.compare(password , user.password);
        //pwdMatch = (password === user.password);
        pwdMatch = await bcrypt.compare(password, user.password);

        if (!pwdMatch) throw "Either the username and or password is invalid";

        return { authenticated: true };
    },

    async getUsersList() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        for (let i = 0; i < userList.length; i++) {
            userList[i]._id = userList[i]._id.toString();

        }
        let arr = [];
        for (let i = 0; i < userList.length; i++) {
            arr.push(userList[i].userName);
        }
        // console.log(arr);
        return userList;
    },

    async isAdmin(userName) {
        const userCollection = await users();
        let user = await userCollection.findOne({ userName: userName });
        if (!user) throw "No user found";


        return user.isAdmin;
    },

    async updateIsAdmin() {
        const userCollection = await users();
        let user = await userCollection.findOne({ userName: "admin" });
        if (!user) throw "No user found";
        let updatedUser = {
            isAdmin: true
        }
        const updateInfo = await userCollection.updateOne({ _id: ObjectId(user._id) }, { $set: updatedUser });
        // const updateInfo = await userCollection.updateOne(
        //     {_id : user._id},
        //     { $set: updatedUser}
        // );
        console.log(user._id);
        console.log(updateInfo);

        if (updateInfo.modifiedCount === 0) {
            throw 'could not update the record successfully or record does not exist';
        }

        // console.log(user.isAdmin);

        return;
    },

    async userProfile(userName) {
        const userCollection = await users();
        let user = await userCollection.findOne({ userName: userName });
        if (!user) throw "No user found";

        return user;
    },


    async removeUserPlan(userId, id) {

        if (!id.replace(/\s/g, '').length) throw { statusCode: 400, message: 'ID not valid' };
        if (!id) throw { statusCode: 400, message: 'ID not valid' };
        if (typeof id != 'string') throw { statusCode: 400, message: `ID not valid` };
        try {
            const userCollection = await users();
            for (let i = 0; i < userId.length; i++) {
                let user = await userCollection.findOne({ _id: userId[i] });
                let removed = this.removePlan(user.userName, id)
            }
            return true;
        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }

    },

    async updateUser(id, userName, password, firstName, lastName, email, dateOfBirth, phoneNo, address, city, state, zipcode) {

        if (!userName) throw "Please provide a userName"

        if (userName.length < 4) throw "Invalid username";

        if (userName.trim().length === 0) throw "Invalid username";

        let reg = /[ `!@#$%^&*()_=\-=\[\]{};';"\\|,.<>\/?~\n’‘“”—]/g;
        if (reg.test(userName)) throw "Invalid username";


        if (!password) throw "Please provide password"

        if (password.length < 6) throw "Invalid password";

        if (password.trim().length === 0) throw "Invalid password";

        if (password.includes(' ')) throw "Invalid password";


        if (!firstName) throw "Please provide full name";

        if (firstName.length === 0) throw "Please provide full name";

        if (firstName.trim().length === 0) throw "Please provide full name";

        if (!lastName) throw "Please provide Last name"

        if (!lastName.length === 0) throw "Please provide Last name"

        if (!lastName.trim().length === 0) throw "Please provide Last name"

        if (!email) throw "Please provide an email"

        if (email.length === 0) throw "Please provide an email"

        if (email.trim().length === 0) throw "Please provide an email";

        //emailReg = /^[a-zA-Z0-9][(-._|a-zA-Z0-9)]+@[(.com|.org|.edu)]$]/;
        emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailReg.test(email)) {
            throw "Please provide a valid email"
        }

        if (!dateOfBirth) throw "Please provide date of birth"

        if (dateOfBirth.length === 0) throw "Please provide date of birth"

        if (dateOfBirth.trim().length === 0) throw "Please provide date of birth";

        d1 = new Date(dateOfBirth + " 00:00:00");
        d2 = new Date();
        diffDate = d2.getFullYear() - d1.getFullYear();
        if (d1 > d2 || d1 === d2) {
            throw "Please provide a valid date of birth";
        }

        if (diffDate < 18) {
            throw "Date of birth is not valid user should be 18 or above"
        }

        if (!phoneNo) throw "Please provide phoneNo."

        if (phoneNo.length === 0) throw "Please provide phoneNo."

        if (phoneNo.trim().length === 0) throw "Please provide phoneNo."

        let val = /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
        if (!val.test(phoneNo)) {
            throw "Please provide a valid phone number";
        }

        if (!address) throw "Please provide address"

        if (address.length === 0) throw "Please provide address"

        if (address.trim().length === 0) throw "Please provide address"


        if (!city) throw "Please provide city"

        if (city.length === 0) throw "Please provide city"

        if (city.trim().length === 0) throw "Please provide city"

        if (!state) throw "Please provide state"

        if (state.length === 0) throw "Please provide state"

        if (!state.trim().length === 0) throw "Please provide state"

        if (!zipcode) throw "Please provide zipcode"

        if (zipcode.length === 0) throw "Please provide zipcode"

        if (zipcode.trim().length === 0) throw "Please provide zipcode"

        zipReg = /\d{5}/;

        if (!zipReg.test(zipcode)) {
            throw "Please provide a valid zipcode";
        }

        const userCollection = await users();
        id = ObjectId(id);
        const user = await this.userProfile(userName);

        //pwdMatch = await bcrypt.compare(password , user.password);
        let updatedUser
        let updateInfo;
        if (password === user.password) {
            updatedUser = {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                dateOfBirth: dateOfBirth,
                phoneNo: phoneNo,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode
            }
            updateInfo = await userCollection.updateOne({ _id: id }, {
                $set: {
                    userName: updatedUser.userName,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    dateOfBirth: updatedUser.dateOfBirth,
                    phoneNo: updatedUser.phoneNo,
                    address: updatedUser.address,
                    city: updatedUser.city,
                    state: updatedUser.state,
                    zipcode: updatedUser.zipcode
                }
            });
        } else {
            password = await bcrypt.hash(password, saltRounds);
            updatedUser = {
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                dateOfBirth: dateOfBirth,
                phoneNo: phoneNo,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode
            }

            updateInfo = await userCollection.updateOne({ _id: id }, { $set: updatedUser });
        }

        if (updateInfo.modifiedCount === 0 && updateInfo.matchedCount === 0) {
            throw new Error('could not update the record successfully or record does not exist');
        }

        return true;
    },

    async updatePlan(userName, plan, cardDetails) {

        if (!userName) throw "Please provide a userName";
        if (!cardDetails) throw "Please provide card details";
        if (!plan) throw "Please provide broadband plans";
        if (!cardDetails.nameOfCardHolder) throw "Please provide a Card holder name";
        if (!cardDetails.cardNumber) throw "Please provide a card number";
        if (!cardDetails.expirationMonth) throw "Please provide a expiration month";
        if (!cardDetails.expirationYear) throw "Please provide a expiration year";


        if (!plan.planName) throw "Please provide planName";
        if (plan.planName.length === 0) throw "Please provide planName";
        if (plan.planName.trim().length === 0) throw "Please provide planName";

        if (!plan.price) throw "Please provide plan price";


        if (!plan.validity) throw "Please provide plan validity";

        if (!plan.limit) throw "Please provide plan limit";



        if (cardDetails.nameOfCardHolder.length === 0) {
            throw "Please provide a card holder name";
        }
        if (cardDetails.nameOfCardHolder.trim().length === 0) {
            throw "Please provide a card holder name";
        }


        if (cardDetails.cardNumber.length === 0) {
            throw "Please provide a card number";
        }
        if (cardDetails.cardNumber.trim().length === 0) {
            throw "Please provide a card number";
        }
        if (cardDetails.cardNumber.length !== 16) {
            throw "Please provide a valid card number";
        }

        var regNo = /[0-9]{16}/;
        if (!regNo.test(cardDetails.cardNumber)) {
            throw "Please provide a valid card number";
        }

        if (typeof parseInt(cardDetails.cardNumber) !== 'number') {
            throw "Card number should be Interger";
        }


        if (cardDetails.expirationMonth.length === 0) {
            throw " Please provide a expiry Month";
        }
        if (cardDetails.expirationMonth.trim().length === 0) {
            throw "Please provide a expiry Month";
        }
        if (cardDetails.expirationMonth.length !== 2) {
            throw "Please provide a valid expiry Month";
        }
        if (cardDetails.expirationMonth > 12) {
            throw "Please provide a valid expiry Month";
        }

        var regDate = /^\d{2}$/;
        if (!regDate.test(cardDetails.expirationMonth)) {
            throw "Please provide a valid expiry Month";
        }

        if (typeof parseInt(cardDetails.expirationMonth) !== 'number') {
            throw "Expiration month should be Interger";
        }


        if (cardDetails.expirationYear.trim().length === 0) {
            throw "Please provide a expiry year";
        }
        if (cardDetails.expirationYear.length !== 2) {
            throw "Please provide a valid expiry year";
        }

        if (!regDate.test(cardDetails.expirationYear)) {
            throw "Please provide a valid expiry Month";
        }

        if (typeof parseInt(cardDetails.expirationYear) !== 'number') {
            throw "Expiry year should be Interger";
        }

        let CurrentDate = new Date();
        let currYearStr = CurrentDate.getFullYear().toString();
        let expirationYearFourDigit = "20";

        if (cardDetails.expirationYear.length === 2) {
            expirationYearFourDigit = expirationYearFourDigit + cardDetails.expirationYear;
        }

        if (expirationYearFourDigit < currYearStr) {
            throw "You card has been expired. Please use different card for payment";
        } else if (parseInt(expirationYearFourDigit) > parseInt(currYearStr) + 10) {
            throw "Please use different card for payment. This card seems ambitious";
        }


        const userCollection = await users();
        let user = await userCollection.findOne({ userName: userName });
        const startDate = new Date();
        const temp = new Date();
        const endDate = new Date(temp.setMonth(temp.getMonth() + parseInt(plan.validity)));
        let emnth = endDate.getMonth() + 1;
        let smnth = startDate.getMonth() + 1;
        selected = {
            "broadbandPlanId": plan._id,
            "orderId": Date.now(),
            "planName": plan.planName,
            "price": plan.price * (1 - plan.discount / 100),
            "startDate": smnth + "/" + startDate.getDate() + "/" + startDate.getFullYear(),
            "endDate": emnth + "/" + endDate.getDate() + "/" + endDate.getFullYear()
        }

        for (let e of user.planSelected) {
            let pid = plan._id;
            if (pid.toString() === e.broadbandPlanId.toString()) {
                throw "Plan already selected";
            }
        }
        let newCard = true;
        if (user.cardDetails.length !== 0) {
            for (let e of user.cardDetails) {
                if (cardDetails.cardNumber === e.cardNumber) {
                    //throw "Card number already exists";
                    //break;
                    newCard = false;
                    break;
                }
            }
        }


        if (newCard) {
            user.cardDetails.push(cardDetails);
        }
        user.planSelected.push(selected);

        const updateInfo = await userCollection.updateOne({ _id: user._id }, { $set: { planSelected: user.planSelected, cardDetails: user.cardDetails } });

        if (updateInfo.modifiedCount === 0) {
            throw 'could not update the record successfully or record does not exist';
        }

        return true;
    },

    async removePlan(userName, planId) {
        if (!userName) throw "Please provide username";
        if (!planId) throw "Please provide planId";
        const userCollection = await users();
        let user = await userCollection.findOne({ userName: userName });
        for (let plans of user.planSelected) {
            if (planId === plans.broadbandPlanId.toString()) {
                let i = user.planSelected.indexOf(plans);
                user.planSelected.splice(i, 1);
            }
        }

        const updateInfo = await userCollection.updateOne({ _id: user._id }, { $set: { planSelected: user.planSelected } });

        if (updateInfo.modifiedCount === 0) {
            throw new Error('could not update the record successfully or record does not exist');
        }

        return true;
    },

    async deleteUser(id) {
        id = ObjectId(id);
        const userCollection = await users();
        const deleteInfo = await userCollection.deleteOne({ _id: id });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete user`;
        }

        return true;

    },
    async referafriend(email, userName) {
        const userCollection = await users();
        let user = await userCollection.findOne({ userName: userName });

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mybroadband47@gmail.com",
                pass: "mybroadband@123",
            },
        });

        var mailOptions = {
            from: "mybroadband47@gmail.com",
            to: email,
            subject: "Referal code",
            text: `${userName} sent you a refer code: ${user.refercode}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return user;
    }


};

module.exports = exportedMethods;