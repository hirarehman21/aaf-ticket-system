import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Login from "./Components/Login"
// import HomePage from './Pages/HomePage';
import TicketDetails from './Pages/TicketDetails';
import NewTicket from './Pages/NewTicket';
import TicketList from './Pages/TicketList';
import PrivateRoute from './Components/PrivateRoute';
// import HeaderComponent from './Components/HeaderComponent';

function App() {
  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  // };

  return (
    <div className="App">
      <Router>
        <Switch>
           <Route exact path="/">
            <Login />
          </Route>          
            <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
            <PrivateRoute path="/newTicket"><NewTicket /></PrivateRoute>
            <PrivateRoute path="/ticketList"><TicketList /></PrivateRoute>
            <PrivateRoute path="/ticket/:tId"><TicketDetails /></PrivateRoute>           
        </Switch>
      </Router>
    </div>
  );
}

export default App;
