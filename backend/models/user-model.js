// db queries here
const { UserSchema } = require("./user-schema");

// insert
const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
         UserSchema(userObj)
           .save()
           .then(data => resolve(data))
           .catch(error => reject(error));
    })
    // UserSchema(userObj)
    //     .save()
    //     .then((data) => console.log(data))
    // .catch((error) => console.log(error));
};

module.exports = { insertUser };