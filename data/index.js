const userData = require('./users');
const broadbandData = require('./broadband');
const checkoutData = require('./checkout');
const adminData = require('./admin');
const appointmentData = require('./appointment');

module.exports = {
    users : userData,
    broadband : broadbandData,
    checkout : checkoutData,
    admin : adminData,
    appointment:appointmentData
};