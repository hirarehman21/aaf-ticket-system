const jwt = require("jsonwebtoken");
const { saveJwt, getJwt } = require("./redis");
const { saveUserRefreshJwt } = require("../models/user-model");

const createAccessJWT = async (email, _id) => {
  try {
    // creates token
    const tokenAccessJwt = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    await saveJwt(tokenAccessJwt, _id);
    return Promise.resolve(tokenAccessJwt);
  } catch (error) {
    return Promise.reject(error);
  }
};

// passing id from user-router*
const createRefreshJWT = async (email, _id) => {
  try {
    const tokenRefreshJwt = jwt.sign(
      { email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    await saveUserRefreshJwt(_id, tokenRefreshJwt);
    return Promise.resolve(tokenRefreshJwt);
  } catch (error) {
    return Promise.reject(error);
  }
};

// check if token is verified
const verifyAccessJwt = (userJwt) => {
  try {
    // console.log("bitchhh" + userJwt);
    userJwt = userJwt.split(" ")[1];
    return Promise.resolve(jwt.verify(userJwt, process.env.JWT_ACCESS_SECRET));
    //  return Promise.resolve(jwt.verify(userJwt, process.env.JWT_ACCESS_SECRET));
    // first parameter = token, second = secret key
    // checks user verfication
    //jwt.verify(userJwt, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return Promise.resolve(error);
  }
};

const verifyRefreshJwt = (userJwt) => {
  try {
    // console.log("bitchhh" + userJwt);
    userJwt = userJwt.split(" ")[1];
    return Promise.resolve(jwt.verify(userJwt, process.env.JWT_REFRESH_SECRET));
    //  return Promise.resolve(jwt.verify(userJwt, process.env.JWT_ACCESS_SECRET));
    // first parameter = token, second = secret key
    // checks user verfication
    //jwt.verify(userJwt, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return Promise.resolve(error);
  }
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJwt,
  verifyRefreshJwt,
};
