const Joi = require("joi");

const shortStr = Joi.string().min(2).max(50);
const mediumStr = Joi.string().min(2).max(100);
const longStr = Joi.string().min(2).max(1000);
const date = Joi.date();

const createTicketValidation = (req, res, next) => {
  // make state of the object that defines what data is coming and the data type
  const schema = Joi.object({
    complaint: mediumStr.required(),
    department: shortStr.required(),
    sender: shortStr.required(),
    message: longStr.required(),
    issueDate: date.required(),
  });

  // value sent by the client comese in req.body (post method)
  const value = schema.validate(req.body);

  console.log(value);
  if (value.error) {
    console.log(value.error.message);
    res.json({ status: "error", message: value.error.message });
  }

  next(); // goes to next middleware
};

const ticketReplyValidation = (req, res, next) => {
  // make state of the object that defines what data is coming and the data type
  const schema = Joi.object({
    sender: shortStr.required(),
    message: longStr.required(),
  });

  // value sent by the client comese in req.body (post method)
  const value = schema.validate(req.body);

  //console.log(value);
  if (value.error) {
    console.log(value.error);
    return res.json({ status: "error", message: value.error.message });
  }

  next(); // goes to next middleware
};

module.exports = {
  createTicketValidation,
  ticketReplyValidation,
};
