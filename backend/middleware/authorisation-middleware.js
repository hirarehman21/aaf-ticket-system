const { verifyAccessJwt } = require("../utils/jwt");
const { getJwt } = require("../utils/redis");

const userAuthorisation = async (req, res, next) => {
    const { authorization } = req.headers;
    // const { authorization } = req.headers.authorization.split(" ")[1];
    console.log(authorization);
    
    // verify if jwt is valid
    // decodes the jwt and returns the data if its valid
    const decodedJwt = await verifyAccessJwt(authorization);
    console.log(decodedJwt);
    if (decodedJwt.email) {
        const userId = await getJwt(authorization);
        console.log("userid: " + userId);
        // check if jwt exists in redis
        if (!userId) {
            return res.status(403).json({ message: "Invalid" });
        }

        req.userId = userId;
        
        return next();
     }
    
    

    // if authorization is not valid
    return res.status(403).json({ message: "Invalid!" });
    // res.end();
    // goes to next if valid *
    //next();
    // res.json(authorization);
};

module.exports = {
    userAuthorisation
};