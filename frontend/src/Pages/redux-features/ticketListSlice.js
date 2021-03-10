// ticket slice reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
  error: "",
  replyTicketError: "",
  searchTicketList: [],
  selectedTicket: {},
  replyMsg: ''
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    // two things are received in the reducer, state = draft state
    // updates the state without mutating the data
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
      state.tickets = action.payload;
      state.searchTicketList = action.payload;
      state.isLoading = false;
    },
    fetchTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchTickets: (state, { payload }) => {
      state.searchTicketList = state.tickets.filter((row) => {
        if (!payload) return row;

        return row.complaint.toLowerCase().includes(payload.toLowerCase());
      });
    },

    fetchOneTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchOneTicketSuccess: (state, { payload }) => {
      state.selectedTicket = payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchOneTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = payload;
    },
    replyTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.replyTicketError = payload;
    },
    closeTicketLoading: (state) => {
      state.isLoading = true;
    },
    closeTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = payload;
    },
    closeTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetResponseMsg: (state) => {
      state.isLoading = false;
      state.replyTicketError = "";
      state.replyMsg = "";
    },
  },
});

const { reducer, actions } = ticketListSlice;

export const {
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
  //searchTickets,
  resetResponseMsg,
} = actions;

export default reducer;
