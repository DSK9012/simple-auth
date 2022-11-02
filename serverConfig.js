const { MONGO_USER, MONGO_PASSWORD, MONGO_URL, MONGO_PORT, MONGO_DB_NAME, SERVER_PORT } = process.env;

module.exports = {
  mongoUrl: MONGO_URL,
  mongoDBName: MONGO_DB_NAME,
  mongoUser: MONGO_USER,
  mongoPwd: MONGO_PASSWORD,
  serverPort: SERVER_PORT,
};
