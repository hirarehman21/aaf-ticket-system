const jwt = require("jsonwebtoken");
const { saveJwt, getJwt } = require("./redis");
const { saveUserRefreshJwt } = require("../models/user-model");

const createAccessJWT = async (email, _id) => {
    try {
        // creates token
        const tokenAccessJwt = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});

        await saveJwt(tokenAccessJwt, _id);
        return Promise.resolve(tokenAccessJwt);

    } catch (error) {
        return Promise.reject(error);
    }  
   
    
};

// passing id from user-router*
const createRefreshJWT = async (email, _id) => {
    try {
      const tokenRefreshJwt = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
      
      await saveUserRefreshJwt(_id, tokenRefreshJwt);
      return Promise.resolve(tokenRefreshJwt);

    } catch (error) {
      return Promise.reject(error);
    }  
   
};

module.exports = {
  createAccessJWT,
  createRefreshJWT
};