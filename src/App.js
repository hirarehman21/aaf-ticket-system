// import logo from './logo.svg';
import './App.css';
// import HeaderComponent from './Components/HeaderComponent';

// import Login from './Components/LoginComponent';
import HomePage from './Pages/HomePage';

function App() {
  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  // };

  return (
    <div className="App">
      {/* <h1>Ticket system</h1> */}
      <HomePage>
        main content
      </HomePage>
      {/* <Login /> */}
    </div>
  );
}

export default App;
