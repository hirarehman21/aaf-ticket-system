const { verifyAccessJwt } = require("../utils/jwt");
const { getJwt, deleteJWT } = require("../utils/redis");

const userAuthorisation = async (req, res, next) => {
    const { authorization } = req.headers;
    // const { authorization } = req.headers.authorization.split(" ")[1];
    // console.log("authorisation" + authorization.replace("Bearer ", ""));
    
    // verify if jwt is valid
    // decodes the jwt and returns the data if its valid
    const decodedJwt = await verifyAccessJwt(authorization);
    //console.log("whatever", authorization.replace("Bearer ", ""));
     //console.log("decoded" + Object.values(decodedJwt));
    if (decodedJwt.email) {
        const userId = await getJwt(authorization.replace("Bearer ", ""));
        // const userId = await getJwt(
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQDEyMy5jb20iLCJpYXQiOjE2MTQ2MTg1MjAsImV4cCI6MTYxNDYxOTQyMH0.6ZXjjmVqnMTU7Ncwg8-6b6S7skZ4FfHXlEKLW57d44U"
        // );
        // console.log( await getJwt(authorization));
        console.log("userid: " + userId);
        // check if jwt exists in redis
        if (!userId) {
            return res.status(403).json({ message: "Invalid" });
        }

        req.userId = userId;
        
        return next();
     }
    
    deleteJWT(authorization );

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