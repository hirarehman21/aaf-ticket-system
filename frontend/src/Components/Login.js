import React from 'react'
import {Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleOnSubmit = (e) => {
      e.preventDefault();

      if (!email || !pass) {
        return alert("Form Incomplete!");
      }
      
      // TODO validation and form submit 
      console.log(email, pass);
    };    

    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Login</h2>
            <hr />
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
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  //   onChange={handleOnChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;