const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// if port available in the environment variable, use that, otherwise use 3001
const port = process.env.PORT || 3001;

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type, Authorization"
//   );
//   next();
// });

//app.use(cors({ origin: "http://localhost:3000" }));
// app.use(
//   cors(
//    {
//     origin: ["http://localhost:3000/"],
//    // "Access-Control-Allow-Origin: http://localhost:3000"
//     // methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
//     }
//   )
// );

// API security
// helmet - initial secuirty setup*
app.use(helmet());

// const corsOptions = {
//   origin: "http://localhost:3000/",
//   //credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );

//   if ("OPTIONS" === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });
app.use(cors());
// Handle CORS error
// app.options("*", cors(
//    {
//       origin: ["http://localhost:3000/"],
//      //Access Control Allow Origin: 'http://localhost:3000',
//      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
//     }
// ));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// MongoDB connection
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// event emmiter?*
if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;
  mDb.on("open", () => {
    console.log("MongoDB is connected!");
  });
  mDb.on("error", () => {
    console.log(error);
  });

  // Logger ?*
  app.use(morgan("tiny"));
}

// Set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
// Middleware - function that executes during request lifecycle*
// Access the request or response object and allows modification to it

// Load routers
const userRouter = require("./routers/user-router");
const ticketRouter = require("./routers/ticket-router");
const tokensRouter = require("./routers/tokens-router");

// Use routers end-points

// with every request from /user, it redirects to userRouter
// end points/ entry points*
app.use("/user", userRouter);
app.use("/ticket", ticketRouter);
app.use("/tokens", tokensRouter);

// Error handler
const errorHandler = require("./utils/errorHandler");

app.use((req, res, next) => {
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  // );
  //res.setHeader("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Origin", "http://localhost:3001/");
  // update to match the domain you will make the request from
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  //   'Access-Control-Allow-Origin: http://localhost:3000'
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type, Authorization"
  // );
  //   next();

  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  //"Access-Control-Allow-Origin: http://localhost:3000";
  // res.header(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  // ); // If needed
  // res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type"); // If needed
  //res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // res.send('cors problem fixed:)');

  // res.header("Allow-Origin", "*");

  //console.log("f u");
  //res.send("bitchhhh");

  //res.json({ message: "bloody work already!" });

  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

// next - calls the next router *
// when no router is found, throws an error

app.use((error, req, res, next) => {
  errorHandler(error, res); // respond error back to client
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// module.exports = {
//   corsOptions
// };
