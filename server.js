require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverConfig = require('./serverConfig');
const morgan = require('morgan');
const app = express();
const connectToMongoDB = require('./DBConnections');

// Allow cors
app.use(cors());

// Http requests logger
app.use(morgan('dev'));

// Database Connection
connectToMongoDB();

// Intializing express middleware to parse the data in req object
app.use(express.json({ extended: false }));

app.use('/api', require('./routes/users/usersRouter'));

const serverPort = serverConfig.serverPort;
app.listen(serverPort, () => {
  console.log(`SimpleAuth app listening on ${serverPort}`);
});
