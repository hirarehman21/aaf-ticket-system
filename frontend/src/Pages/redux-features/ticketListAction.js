//import axios from "axios";
import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchOneTicketLoading,
  fetchOneTicketSuccess,
  fetchOneTicketFail,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFail,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFail,
} from "./ticketListSlice";

import {
  getAllTickets,
  getOneTicket,
  updateReplyTicket,
  updateTicketStatusClosed,
} from "../../api/ticketApi";

// high order function
export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    // fetch data from api
    const result = await getAllTickets();

    console.log("resulttt", result);
    result.data.result.length &&
      dispatch(fetchTicketSuccess(result.data.result));
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

//...
export const filterSearchTicket = (str) => (dispatch) => {
    dispatch(searchTickets(str));
};

//Action for single ticket 
export const fetchOneTicket = (_id) => async (dispatch) => {
  dispatch(fetchOneTicketLoading());
  try {
  const result = await getOneTicket(_id);
    dispatch(
      fetchOneTicketSuccess(
        result.data.result.length && result.data.result[0]
      )
    );
  } catch (error) {
    dispatch(fetchOneTicketFail(error.message));
  }
};

//Action for replying on single ticket
export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());
  try {
    // api func
    const result = await updateReplyTicket(_id, msgObj);
    console.log(result);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }
    console.log("result" + result)
    dispatch(fetchOneTicket(_id));

    dispatch(replyTicketSuccess(result.message));
  } catch (error) {
    console.log(error.message);
    dispatch(replyTicketFail(error.message));
  }
};

//Action for closing ticket
export const closeTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());
  try {
    const result = await updateTicketStatusClosed(_id);
    if (result.status === "error") {
      return dispatch(closeTicketFail(result.message));
    }

    dispatch(fetchOneTicket(_id));

    dispatch(closeTicketSuccess("Status Updated successfully"));
  } catch (error) {
    console.log(error.message);
    dispatch(closeTicketFail(error.message));
  }
};