import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./Pages/redux-features/ticketListSlice";
import loginReducer from "./Pages/redux-features/loginSlice";
import userReducer from "./Pages/redux-features/userSlice";
import newTicketReducer from "./Pages/redux-features/newTicketSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    openTicket: newTicketReducer,
  },
});

export default store;
