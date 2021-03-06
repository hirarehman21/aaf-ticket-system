const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  complaint: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },
  openedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: "Response pending",
  },
  department: {
    type: String,
    maxlength: 50,
    required: true,
    default: "",
  },
  conversation: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 1000,
        required: true,
        default: "",
      },
      repliedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
