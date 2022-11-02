// const chalk=require('chalk');
const mongoose = require('mongoose');
const { mongoDBName } = require('./serverConfig');
const serverConfig = require('./serverConfig');

// Database Connection
const connectToMongoDB = async () => {
  try {
    const { mongoUser, mongoPwd, mongoUrl, mongoDBName } = serverConfig;
    const mongoURL = `mongodb://${mongoUser ? mongoUser + ':' : ''}${
      mongoPwd ? mongoPwd + '@' : ''
    }${mongoUrl}/${mongoDBName}`;
    await mongoose
      .connect(mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log(`server connected to ${mongoDBName} database`))
      .catch((error) => console.log(`Error in DB connection : ${error.message}`));

    mongoose.connection.on('open', function () {
      console.log(`Server connected to ${mongoDBName} database`);
    });
    mongoose.connection.on('error', function (err) {
      console.error(`Error in DB connection: ${err}`);
    });
    mongoose.connection.on('disconnected', function () {
      console.log('Server is disconnected from DB');
    });
  } catch (error) {
    console.log(`Error in DB connection, terminating connection process : ${error.message}`);
    // Terminate DB Connection Process
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
