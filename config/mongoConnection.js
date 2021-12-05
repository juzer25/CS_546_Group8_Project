const mongoClient = require('mongodb').MongoClient;
const settings = {
  mongoConfig: {
    serverUrl: 'mongodb://localhost:27017/',
    database: 'BroadbandProject'
  }
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports =  {
  connectToDb: async() => {
  if (!_connection) {
    _connection = await mongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;

},

closeConnection: () => {
  _connection.close();
}
}