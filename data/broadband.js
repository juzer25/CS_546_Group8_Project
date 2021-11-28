const { create } = require('express-handlebars');
const mongoCollections = require('../config/mongoCollections');
const broadband = mongoCollections.broadbandPlans;

module.exports = {

    async listPlans(){
        const broadbandCollection = await broadband();
        const broadbandList = await broadbandCollection.find({}).toArray();
        if(!broadbandList) throw "No Plans found";

        return broadbandList;
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
    }
};