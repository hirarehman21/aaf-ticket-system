import React from 'react'
import {Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { loginPending, loginSuccess, loginFail } from "../Pages/redux-features/loginSlice";
import { userLogin } from "../api/userApi";
import { getUserProfile } from "../Pages/redux-features/userAction";


function Login() {

    const dispatch = useDispatch();
    const history = useHistory();  
  
    const {isLoading, isAuth, error } = useSelector((state) => state.login);
    
   useEffect(() => {
     sessionStorage.getItem("accessJwt") && history.push("/dashboard");
   }, [history, isAuth]);

    const [email, setEmail] = useState("user1@123.com");
    const [password, setPass] = useState("secret123");

    // const handleOnChange = (e) => {
    //   const { name, value } = e.target;

    //   switch (name) {
    //     case "email":
    //       setEmail(value);
    //       break;

    //     case "password":
    //       setPassword(value);
    //       break;

    //     default:
    //       break;
    //   }
    // };

    const handleOnSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password) {
        return alert("Form Incomplete!");
      }
      
      dispatch(loginPending());

      // validation and form submit 
      try {
        const isAuth = await userLogin({ email, password });
        console.log("isauth ", isAuth);
        console.log(email, password);

        if (isAuth.status === "error") {
          return dispatch(loginFail(isAuth.message));
        }

        dispatch(loginSuccess());
        history.push("/dashboard");

        dispatch(getUserProfile());

      } catch (error) {
      dispatch(loginFail(error.message));
    }

      
      //console.log(email, pass);
    };    

    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Login</h2>
            <hr />
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  //   onChange={handleOnChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Button type="submit">Login</Button>
              {isLoading && <Spinner variant="primary" animation="border"/>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;