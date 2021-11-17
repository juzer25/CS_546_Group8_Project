const userRoutes = require('./users');
const broadbandRoutes = require('./broadband');
const adminRoutes = require('./admin');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/', (req, res) => {
        res.render('broadband/index',{});
    });
};

module.exports = constructorMethod;