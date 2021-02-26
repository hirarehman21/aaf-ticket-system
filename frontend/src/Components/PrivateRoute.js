import React from "react";
import { Route, Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage"

function PrivateRoute({ children, ...rest }) {
  const isAuth = true;    
  return <Route
    {...rest}
    render={() => (isAuth ? <HomePage>{children}</HomePage> : <Redirect to="/" />)}
  />;
}

export default PrivateRoute;
