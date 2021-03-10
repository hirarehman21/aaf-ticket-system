import axios from "axios";

const rootUrl = "http://localhost:3001/";
const ticketUrl = rootUrl + "ticket/";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";
//const ticketUrl = rootUrl + "ticket/";
export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3001/ticket/", {
        headers: {
          Authorization: sessionStorage.getItem("accessJwt"),
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};


export const getOneTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUrl + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJwt"),
        },
      });
      resolve(result);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(ticketUrl + _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessJwt"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(closeTicketUrl + _id, {}, {
          headers: {
            Authorization: sessionStorage.getItem("accessJwt"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const createNewTicket = (formData) => {
  console.log("from api", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUrl, formData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJwt"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};