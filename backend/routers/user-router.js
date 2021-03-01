const express = require("express");
const router = express.Router();
const { insertUser, getUserByEmail, getUserById} = require("../models/user-model");
const { createAccessJWT, createRefreshJWT } = require("../utils/jwt");
const { userAuthorisation } = require("../middleware/authorisation-middleware");

// hash password using bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(plainPassword, saltRounds));
  });
};

const comparePass = (plainPass, dbPass) => {
    return new Promise((resolve, reject) => {

        bcrypt.compare(plainPass, dbPass, function (err, result) {
        // result == true
            if (err) reject(err);
            resolve(result);
        });
    });
}

router.all("/", (req, res, next) => {
  // console.log(name);
  // res.json({ message: "return from user router" });
  next(); // goes to the next router
});

// get user profile router *
router.get("/", userAuthorisation, async (req, res) => {
  // assume data coming from db
  // const user = {
  //   name: "Random user",
  //   email: "Random@123.com",
  //   password: "secret123"
  // };
  const _id = req.userId;

  const userProfile = await getUserById(_id);
  // extract user id
  // get user profile based on user id

  // res.json({ user: req.userId });
  res.json({ user: userProfile });
});

// Router handling
// Create new user route
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // hash password
    const hashedPass = await hashPassword(password);

    // holds all the data coming from the client
    const newUserObj = {
      name,
      email,
      password: hashedPass,
    };

    // const result = await insertUser(req.body);
    const result = await insertUser(newUserObj);
    console.log(result);
    // res.json(req.body);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

// User sign in route
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  // hash password and compare with db password
  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid submission!" });
  }

  // get user email from db
    const user = await getUserByEmail(email);
    console.log(user);

    const dbPass = user && user._id ? user.password : null;

    if (!dbPass)
        return res.json({ status: "error", message: "Invalid email or password!" });    
    
    
    const result = await comparePass(password, dbPass);

    if (!result) {
       return res.json({ status: "error", message: "Invalid email or password!" });
    }

    const accessJwt = await createAccessJWT(user.email, `${ user._id }`);
    const refreshJwt = await createRefreshJWT(user.email, `${user._id}`);

    console.log(result);

    res.json({ status: "success", message: "Login Successful!", accessJwt, refreshJwt });
});




module.exports = router;
