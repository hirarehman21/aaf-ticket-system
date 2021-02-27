const jwt = require("jsonwebtoken");
const {saveJwt, getJwt} = require("./redis")

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

const createRefreshJWT = (payload) => {
  // creates token
    const tokenRefreshJwt = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return Promise.resolve(tokenRefreshJwt);
};

module.exports = {
  createAccessJWT,
  createRefreshJWT
};