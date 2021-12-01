const userData = require('./users');
const broadbandData = require('./broadband');
const adminData = require('./admin');
const appointmentData = require('./appointment');

module.exports = {
    users : userData,
    broadband : broadbandData,
    admin : adminData,
    appointment:appointmentData
};