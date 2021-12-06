let {ObjectId} = require("mongodb");
const { create } = require('express-handlebars');
const mongoCollections = require('../config/mongoCollections');
const broadband = mongoCollections.broadbandPlans;

module.exports = {

    async listPlans() {
        const broadbandCollection = await broadband();
        const broadbandList = await broadbandCollection.find({}).toArray();
        if (!broadbandList) throw "No Plans found";

        return broadbandList;
    },

    async getPlan(planName){
        const broadbandCollection = await broadband();
        
        let plan = await broadbandCollection.findOne({planName: planName});

        if(!plan) throw "Plan not found";

        return plan;
    },

    //get plan by ID
    async getPlanById(planId){
        ObjectId(planId);
        const broadbandCollection = await broadband();

        plan = await broadbandCollection.findOne({_id:planId});

        if(!plan) throw "Plan not found";

        return plan;
    },

    async create(planName, price, validity, limit, discount) {

        try {
            const broadbandCollection = await broadband();
            let value = {
                planName: planName,
                price: price,
                validity: validity,
                limit: limit,
                discount: discount,
                userID: [],
                statistics: 0
            }
            const insertInfo = await broadbandCollection.insertOne(value);
            if (insertInfo.insertedCount === 0) throw { statusCode: 500, message: 'Could not add Broadband' };
            return insertInfo;
        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }
    },

    async addUser(id,plan){
        plan.userID.push(id);

        const broadbandCollection = await broadband();

        const updateInfo = await broadbandCollection.updateOne(
            {_id : plan._id},
            { $set: plan}
        );

        if(updateInfo.modifiedCount === 0){
            throw new Error('could not update the record successfully or record does not exist');
        }

        return true;

    },

    async remove(name) {

        try {
            const broadbandCollection = await broadband();
            const deletionInfo = await broadbandCollection.deleteOne({ planName: name });
            if (deletionInfo.deletedCount === 0) {
                throw { statusCode: 400, message: `Could not delete Plan` };
            }
            return 'Success';
        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }

    }
};