import { MongoClient } from "mongodb";

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }

  return _db;
};
const closeConnection = async () => {
  await _connection.close();
};

const mongoConfig = {
  serverUrl: "mongodb://localhost:27017/",
  database: "Hanyu_Wang",
};
export { dbConnection, closeConnection, mongoConfig };
