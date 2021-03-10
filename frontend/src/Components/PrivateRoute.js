import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { loginSuccess } from "../Pages/redux-features/loginSlice";
import { getUserProfile } from "../Pages/redux-features/userAction";
//import { fetchNewAccessJWT } from "../api/userApi";
import HomePage from "../Pages/HomePage";

function PrivateRoute({ children, ...rest }) {
  //const isAuth = true;
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  console.log("isauth bitch", isAuth);
  // const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // const updateAccessJWT = async () => {
    //   const result = await fetchNewAccessJWT();
    //   console.log("result bitch", result);
    //   result && dispatch(loginSuccess()); // if result = true, invoke loginSuccess
    // };

     !user._id && dispatch(getUserProfile());

    //  !sessionStorage.getItem("accessJwt") &&
    //    localStorage.getItem("ticketSystem") &&
    //updateAccessJWT();

    !isAuth && sessionStorage.getItem("accessJwt") && dispatch(loginSuccess());
    }, [dispatch, isAuth, user._id]);
  //}, [dispatch, isAuth]);

  // any changes to isAuth state or anything in [] , useEffect makes whole component re-render

  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? <HomePage>{children}</HomePage> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
