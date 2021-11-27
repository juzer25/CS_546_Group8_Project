const userRoutes = require('./users');
const broadbandRoutes = require('./broadband');
const adminRoutes = require('./admin');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/users', userRoutes);
    app.use('/broadband', broadbandRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;