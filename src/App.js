// import logo from './logo.svg';
import './App.css';
// import NewTicketForm from './Components/NewTicketForm';
// import Dashboard from './Pages/Dashboard';
// import HeaderComponent from './Components/HeaderComponent';

// import Login from "./Components/Login"
import HomePage from './Pages/HomePage';
import TicketDetails from './Pages/TicketDetails';
// import NewTicket from './Pages/NewTicket';
// import TicketList from './Pages/TicketList';

function App() {
  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  // };

  return (
    <div className="App">
      {/* <h1>Ticket system</h1> */}
      <HomePage>
        {/* <Dashboard /> */}
        {/* <NewTicket /> */}
        {/* <TicketList/> */}
        <TicketDetails />
        {/* <Login /> */}
      </HomePage>
    </div>
  );
}

export default App;
