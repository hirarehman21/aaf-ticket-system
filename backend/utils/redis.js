const redis = require("redis");
// by default has access to redis://localhost:6379
const client = redis.createClient(process.env.REDIS_URL);

// set key
const saveJwt = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// get key
const getJwt = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {       
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  saveJwt,
  getJwt,
};
