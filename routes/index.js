const userRoutes = require('./users');
const broadbandRoutes = require('./broadband');
const checkoutRoutes = require('./checkout');
const adminRoutes = require('./admin');
const appointmentRoutes = require('./appointment');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/users', userRoutes);
    app.use('/', broadbandRoutes);
    app.use('/', checkoutRoutes);
    app.use('/', appointmentRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;