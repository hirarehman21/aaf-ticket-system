const express = require("express");
const router = express.Router();

const { verifyRefreshJwt, createAccessJWT } = require("../utils/jwt");
const { getUserByEmail } = require("../models/user-model");

router.get("/", async (req, res, next) => {
  const { authorization } = req.headers; // authorisation property coming into header

  
  // check validity of token
  const decoded = await verifyRefreshJwt(authorization);
  if (decoded.email) {
    // check if jwt exists in the db
    const userProfile = await getUserByEmail(decoded.email);
    if (userProfile._id) {
    //   res.status(403).json({ message: userProfile });
        let tokenExp = userProfile.refreshJWT.dateAdded;
        const refreshTokenDb = userProfile.refreshJWT.token;

      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
      );
    
        const today = new Date();
        // to check if the refreshJWT sent from the client is valid or not
        if (refreshTokenDb !== authorization.replace("Bearer ", "") && tokenExp < today) {
            return res.status(403).json({ message: "Token Expired" });
        }
        const accessJWT = await createAccessJWT(decoded.email, userProfile._id.toString());

        // delete old token from redis db


        return res.json({ status: "success", accessJWT });
    //   console.log(new Date(tokenExp));
    //   console.log(tokenCreated);
      // check if it is expired or not
    }
  }

  // res.json({ message: authorization.replace("Bearer ", "") });
  // res.json({ message: decoded });
  res.status(403).json({ message: "Forbidden" });
  //console.log(authorization);
});

// if the user requests user profile and if the token is expired, 
// this router allows them to request a new refreshed key
// manages jwt and provides a fresh access token back to client

module.exports = router;
