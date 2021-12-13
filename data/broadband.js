let { ObjectId } = require("mongodb");
const { create } = require('express-handlebars');
const mongoCollections = require('../config/mongoCollections');
const broadband = mongoCollections.broadbandPlans;


const get = async(id) => {

    if (!id.replace(/\s/g, '').length) throw { statusCode: 400, message: 'ID not valid' };
    if (!id) throw { statusCode: 400, message: 'ID not valid' };
    if (typeof id != 'string') throw { statusCode: 400, message: `ID not valid` };
    try {
        const broadbandCollection = await broadband();
        let objectId = new ObjectId(id);
        const planByName = await broadbandCollection.findOne({ _id: objectId });
        if (planByName == null) return null;
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
        try {
            const broadbandCollection = await broadband();
            const broadbandList = await broadbandCollection.find({}).toArray();
            if (broadbandList.length == 0) return null;
            for (let i = 0; i < broadbandList.length; i++) {
                broadbandList[i]._id = broadbandList[i]._id.toString();
            }

            return broadbandList;
        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }
    },
    async maxplan() {

        try {
            const broadbandCollection = await broadband();
            const broadbandList = await broadbandCollection.find({}).toArray();
            if (broadbandList.length == 0) return null;
            let maxplan = []

            for (let i = 0; i < broadbandList.length; i++) {
                maxplan[i] = broadbandList[i].userID.length;
            }
            let max = Math.max(...maxplan)
            if (max == 0) return null;
            let name = [],
                j = 0;
            for (let i = 0; i < broadbandList.length; i++) {
                if (max == broadbandList[i].userID.length) {
                    name[j] = broadbandList[i].planName;
                    j += 1;
                }
            }
            return name;
        } catch (e) {
            throw { statusCode: 500, message: `Internal Server error` };
        }

    },

    get,



    async getPlan(planName) {
        try {
            planName = planName.toLowerCase();
            const broadbandCollection = await broadband();
            let plan = await broadbandCollection.findOne({ planName: planName });
            if (!plan) throw { statusCode: 404, message: `Plan not found` };
            // plan.price = plan.price * (1 - plan.discount / 100);
            return plan;

        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }
    },

    //get plan by ID
    async getPlanById(planId) {

        // ObjectId(planId);
        const broadbandCollection = await broadband();
        plan = await broadbandCollection.findOne({ _id: ObjectId(planId) });
        if (!plan) throw "Plan not found";
        return plan;
    },

    async create(planName, price, validity, limit, discount) {

        if (!planName) throw { statusCode: 400, message: 'Input PLANNAME cannot be empty' }
        if (typeof planName != 'string') throw { statusCode: 400, message: 'Input PLANNAME should be string and valid' };
        if (!planName.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input PLANNAME should be string and valid' };

        if (!price) throw { statusCode: 400, message: 'Input PRICE cannot be empty' }
        if (!(/^\d+$/.test(price))) throw { statusCode: 400, message: 'Input PRICE should only be number' }
        if (typeof price != 'string') throw { statusCode: 400, message: 'Input PRICE should be string and valid' };
        if (!price.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input PRICE should be string and valid' };

        if (!validity) throw { statusCode: 400, message: 'Input VALIDITY cannot be empty' }
        if (typeof validity != 'string') throw { statusCode: 400, message: 'Input VALIDITY should be string and valid' };
        if (!validity.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input VALIDITY should be string and valid' };

        if (!limit) throw { statusCode: 400, message: 'Input LIMIT cannot be empty' }
        if (typeof limit != 'string') throw { statusCode: 400, message: 'Input LIMIT should be string and valid' };
        if (!limit.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input LIMIT should be string and valid' };

        if (!discount) throw { statusCode: 400, message: 'Input DISCOUNT cannot be empty' }
        if (!(/^\d{1,2}$/.test(discount))) throw { statusCode: 400, message: 'Input DISCOUNT should only be number' }
        if (typeof discount != 'string') throw { statusCode: 400, message: 'Input DISCOUNT should be string and valid' };
        if (!discount.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input DISCOUNT should be string and valid' };

        try {
            planName = planName.toLowerCase();
            const broadbandCollection = await broadband();
            const planByName = await broadbandCollection.findOne({ planName: planName });
            if (planByName == null) {
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
            } else {
                throw { statusCode: 400, message: 'Plan Name already exist' }
            }

        } catch (e) {
            if (e.statusCode && e.statusCode != 500) {
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

    async remove(id) {

        if (!id.replace(/\s/g, '').length) throw { statusCode: 400, message: 'ID not valid' };
        if (!id) throw { statusCode: 400, message: 'ID not valid' };
        if (typeof id != 'string') throw { statusCode: 400, message: `ID not valid` };
        try {
            let objectId = new ObjectId(id);
            const broadbandCollection = await broadband();
            const deletionInfo = await broadbandCollection.deleteOne({ _id: objectId });
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


    async update(id, planName, price, validity, limit, discount) {

        if (!planName) throw { statusCode: 400, message: 'Input PLANNAME cannot be empty' }
        if (typeof planName != 'string') throw { statusCode: 400, message: 'Input PLANNAME should be string and valid' };
        if (!planName.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input PLANNAME should be string and valid' };

        if (!price) throw { statusCode: 400, message: 'Input PRICE cannot be empty' }
        if (!(/^\d+$/.test(price))) throw { statusCode: 400, message: 'Input PRICE should only be number' }
        if (typeof price != 'string') throw { statusCode: 400, message: 'Input PRICE should be string and valid' };
        if (!price.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input PRICE should be string and valid' };

        if (!validity) throw { statusCode: 400, message: 'Input VALIDITY cannot be empty' }
        if (typeof validity != 'string') throw { statusCode: 400, message: 'Input VALIDITY should be string and valid' };
        if (!validity.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input VALIDITY should be string and valid' };

        if (!limit) throw { statusCode: 400, message: 'Input LIMIT cannot be empty' }
        if (typeof limit != 'string') throw { statusCode: 400, message: 'Input LIMIT should be string and valid' };
        if (!limit.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input LIMIT should be string and valid' };

        if (!discount) throw { statusCode: 400, message: 'Input DISCOUNT cannot be empty' }
        if (!(/^\d{1,2}$/.test(discount))) throw { statusCode: 400, message: 'Input DISCOUNT should only be number' }
        if (typeof discount != 'string') throw { statusCode: 400, message: 'Input DISCOUNT should be string and valid' };
        if (!discount.replace(/\s/g, '').length) throw { statusCode: 400, message: 'Input DISCOUNT should be string and valid' };


        try {
            const broadbandCollection = await broadband();
            let objectId = new ObjectId(id);
            let plan = await broadbandCollection.findOne({ _id: objectId });
            // if (plan == null) return null;
            const updatedPlan = await broadbandCollection.updateOne({ _id: objectId }, { $set: { price: price, validity: validity, limit: limit, discount: discount } });
            if (updatedPlan.modifiedCount === 0) {
                throw { statusCode: 400, message: 'Could not update plan successfully' };
            }
            return "Update successful"
        } catch (e) {
            if (e.statusCode) {
                throw { statusCode: e.statusCode, message: e.message };
            } else
                throw { statusCode: 500, message: `Internal Server error` };
        }
    }


};