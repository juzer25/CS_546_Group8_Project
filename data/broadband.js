let { ObjectId } = require("mongodb");
const { create } = require('express-handlebars');
const mongoCollections = require('../config/mongoCollections');
const broadband = mongoCollections.broadbandPlans;


const get = async(id) => {

    try {
        const broadbandCollection = await broadband();
        let objectId = new ObjectId(id);

        const planByName = await broadbandCollection.findOne({ _id: objectId });
        return planByName;
    } catch (e) {
        if (e.statusCode) {
            throw { statusCode: e.statusCode, message: e.message };
        } else
            throw { statusCode: 500, message: `Internal Server error` };
    }
}






module.exports = {

    async listPlans() {
        const broadbandCollection = await broadband();
        const broadbandList = await broadbandCollection.find({}).toArray();
        if (!broadbandList) throw "No Plans found";

        return broadbandList;
    },
    get,

    async getPlan(planName) {
        const broadbandCollection = await broadband();

        let plan = await broadbandCollection.findOne({ planName: planName });

        if (!plan) throw "Plan not found";

        return plan;
    },

    //get plan by ID
    async getPlanById(planId) {
        ObjectId(planId);
        const broadbandCollection = await broadband();

        plan = await broadbandCollection.findOne({ _id: planId });

        if (!plan) throw "Plan not found";

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

    async addUser(id, plan) {
        plan.userID.push(id);

        const broadbandCollection = await broadband();

        const updateInfo = await broadbandCollection.updateOne({ _id: plan._id }, { $set: plan });

        if (updateInfo.modifiedCount === 0) {
            throw new Error('could not update the record successfully or record does not exist');
        }

        return true;

    },

    async removeUser(id, plan) {
        const broadbandCollection = await broadband();
        for (let user of plan.userID) {
            if (id.toString() === user.toString()) {
                let i = plan.userID.indexOf(user);
                plan.userID.splice(i, 1);
            }
        }

        const updateInfo = await broadbandCollection.updateOne({ _id: plan._id }, { $set: { userID: plan.userID } });
        if (updateInfo.modifiedCount === 0) {
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

    },


    async update(name, price, validity, limit, discount) {

        try {
            const broadbandCollection = await broadband();
            let plan = await broadbandCollection.findOne({ planName: name });
            console.log(plan);
            console.log("0");

            // if (plan == null) return null;
            let updatePlan = {
                planName: planName,
                price: price,
                validity: validity,
                limit: limit,
                discount: discount,
            }
            const updatedPlan = await broadbandCollection.updateOne({ _id: plan._id }, { $set: updatePlan });
            console.log(updatePlan)
            if (updatedRestuarant.modifiedCount === 0) {
                throw { statusCode: 400, message: 'Could not update plan successfully' };
            }
        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }
    }


};