const express = require("express");
const router = express.Router();
const { insertUser } = require("../models/user-model");

router.all("/", (req, res, next) => {
  // console.log(name);
  // res.json({ message: "return from user router" });
  next(); // goes to the next router
});

// router handling
router.post("/", async (req, res) => {
  try {
    const result = await insertUser(req.body);
    console.log(result);
    // res.json(req.body);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
