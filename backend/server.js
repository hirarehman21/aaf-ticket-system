const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// if port available in the environment variable, use that, otherwise use 3001
const port = process.env.PORT || 3001;

// API security
// helmet - initial secuirty setup*
app.use(helmet());

// Handle CORS error
app.use(cors());

// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ticket-system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// event emmiter?* 
const mDb = mongoose.connection;
mDb.on('open', () => {
    console.log("MongoDB is connected!");
});
mDb.on('error', () => {
  console.log(error);
});

// Logger ?*
app.use(morgan("tiny"));

// Set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Middleware - function that executes during request lifecycle*
// Access the request or response object and allows modification to it

// Load routers
const userRouter = require("./routers/user-router");
const ticketRouter = require("./routers/ticket-router");

// Use routers

// with every request from /user, it redirects to userRouter
app.use("/user", userRouter);
app.use("/ticket", ticketRouter);

// Error handler
const errorHandler = require('./utils/errorHandler');

// next - calls the next router *
// when no router is found, throws an error
app.use((req, res, next) => {
    const error = new Error('Resources not found!')
    error.status = 404;
    next(error);    
});

app.use((error, req, res, next) => {
    errorHandler(error, res); // respond error back to client
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
