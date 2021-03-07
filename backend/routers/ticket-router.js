const express = require("express");
const router = express.Router();
const {
  insertTicket,
  getTickets,
  getTicketById,
  updateClientReply,
  updateStatusClose,
  deleteTicket,
} = require("../models/ticket-model");
const { userAuthorisation } = require("../middleware/authorisation-middleware");
const {
  createTicketValidation,
  ticketReplyValidation,
} = require("../middleware/formValidation-middleware");

// todo
// create url endpoints
// receive new ticket data 
// authorize every request with jwt
// insert in monogodb
// retrieve all the ticket for the specific user - done
// retrieve a ticket from mongodb
// update message conversation in the ticket database
// update ticket status // close, operator response pending, client response pending
// delete ticket from mongodb

// captures all the routes for this endpoint
router.all("/", (req, res, next) => {
  // res.json({ message: "return from ticket router" });

  next();
});

// create url endpoints

// create new ticket
router.post("/", createTicketValidation, userAuthorisation, async (req, res) => {
  try {
    // receive new ticket data
    const { complaint, department, sender, message } = req.body;
    // console.log(req.body);
    //console.log(req.userId);
    const userId = req.userId;
    const ticketObj = {
      clientId: userId,
      complaint,
      department,
      conversation: [
        {
          sender,
          message,
        },
      ],
    };
    const result = await insertTicket(ticketObj);
    // console.log(result);
    if (result._id) {
      return res.json({ status: "success", message: "New ticket created" });
    }
    // insert in monogodb
    //  res.json({ message: "todo create new ticket" });
    res.json({ status: "error", message: "Ticket creation failed" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// get all tickets for specific user
router.get("/", userAuthorisation, async (req, res) => {
  try {
    const userId = req.userId;

    const result = await getTickets(userId);

    //console.log(result);

    //if (result.length) {
      return res.json({ status: "success", result });
    //}
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// get a ticket by id for specific user
router.get("/:_id", userAuthorisation, async (req, res) => {

  //console.log(req.params);
  try {

    const { _id } = req.params;
    const clientId = req.userId;

    const result = await getTicketById(_id, clientId);

    //console.log(result);

    //if (result.length) {
      return res.json({ status: "success", result });
    //}
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// update reply message
router.put("/:_id", ticketReplyValidation, userAuthorisation, async (req, res) => {

  //console.log(req.params);
  try {
    const { message, sender } = req.body;
    const { _id } = req.params;
    //const clientId = req.userId;

    const result = await updateClientReply({ _id, message, sender });

    console.log(result);

    if (result._id) {
      return res.json({ status: "success", message: "message updated" });
    }

    res.json({ status: "err", message: "message update failed" });

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// close ticket - update ticket status
router.patch("/close-ticket/:_id", userAuthorisation, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await updateStatusClose({ _id, clientId });

    console.log(result);

    if (result._id) {
      return res.json({ status: "success", message: "Ticket has been closed" });
    }

    res.json({ status: "err", message: "message update failed" });

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// delete ticket
router.delete("/:_id", userAuthorisation, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await deleteTicket({ _id, clientId });

    // console.log(result);

    //if (result._id) {
      return res.json({ status: "success", message: "Ticket has been deleted" });
    //}

    //res.json({ status: "err", message: "message update failed" });

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
