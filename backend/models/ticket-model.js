const { TicketSchema } = require("./ticket-schema");

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      // ticketObj - object to be stored in the db, passed in TicketSchema
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      // ticketObj - object to be stored in the db, passed in TicketSchema
      TicketSchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      // ticketObj - object to be stored in the db, passed in TicketSchema
      TicketSchema.find({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateClientReply = ({ _id, message, sender }) => {
  return new Promise((resolve, reject) => {
    try {
      // ticketObj - object to be stored in the db, passed in TicketSchema
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          status: "response pending",
          $push: {
            conversation: { message, sender },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusClose = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      // ticketObj - object to be stored in the db, passed in TicketSchema
      TicketSchema.findOneAndUpdate(
        { _id, clientId },
        { status: "Closed" },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTicket = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      // ticketObj - object to be stored in the db, passed in TicketSchema
      TicketSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertTicket,
  getTickets,
  getTicketById,
  updateClientReply,
  updateStatusClose,
  deleteTicket,
};
