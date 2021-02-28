// db queries here
const { UserSchema } = require("./user-schema");

// insert
const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  // UserSchema(userObj)
  //     .save()
  //     .then((data) => console.log(data))
  // .catch((error) => console.log(error));
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return false;
    try {
      UserSchema.findOne({ email }, (error, data) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const saveUserRefreshJwt = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id },
        { $set: { "refreshJWT.token": token, "refreshJWT.dateAdded": Date.now() } }, // data to update
        { new: true } // return latest data
      ).then((data) => resolve(data))
       .catch((error) => {         
          console.log(error);
          reject(error);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = { insertUser, getUserByEmail, saveUserRefreshJwt };
