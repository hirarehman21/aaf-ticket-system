import React from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openNewTicket } from "../Pages/redux-features/newTicketAction";
import { resetSuccessMSg } from "../Pages/redux-features/newTicketSlice";

const initialFormData = {
  complaint: "",
  //name: "",
  issueDate: "",
  department: "",
  message: "",
};
const initialFormError = {
  complaint: false,
  //name: false,
  issueDate: false,
  department: false,
  message: false,
};

function NewTicketForm() {

   const dispatch = useDispatch();

   const {
     user: { name },
   } = useSelector((state) => state.user);
  
   const { error, successMsg } = useSelector(
     (state) => state.openTicket
  );
  
  //console.log(name);

   const [formData, setFormData] = useState(initialFormData);
   const [formDataError, setFormDataError] = useState(initialFormError);

   useEffect(() => {
     return () => {
       successMsg && dispatch(resetSuccessMSg());
     };
   }, [dispatch, formData, formDataError, successMsg]);

   const handleOnChange = (e) => {
     const { name, value } = e.target;

     setFormData({
       ...formData,
       [name]: value,
     });
   };

   const handleOnSubmit = async (e) => {
     e.preventDefault();

     setFormDataError(initialFormError);

    // const isSubjectValid = await shortText(formData.subject);

    //  setFormDataError({
    //    ...initialFormError,
    //    subject: !isSubjectValid,
    //  });

     dispatch(openNewTicket({ ...formData, sender: name }));
   };
  
  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMsg && <Alert variant="primary">{successMsg}</Alert>}
      {/* {isLoading && <Spinner variant="primary" animation="border" />} */}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Complaint
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="complaint"
              value={formData.complaint}
              onChange={handleOnChange}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Complaint"
              required
            />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Created by
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="CreatedBy"
              value={formData.name}
              // onChange={(e) => setPass(e.target.value)}
              onChange={handleOnChange}
              placeholder="Created by"
              required
            />
          </Col>
        </Form.Group> */}
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Date
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={formData.issueDate}
              // onChange={(e) => setPass(e.target.value)}
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Campus/Department Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="department"
              value={formData.department}
              // onChange={(e) => setPass(e.target.value)}
              onChange={handleOnChange}
              placeholder="Campus/Department"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        {/* <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Allocated Support User
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="supportUser"
              // value={pass}
              // onChange={(e) => setPass(e.target.value)}
              //   onChange={handleOnChange}
              placeholder="Support User Allocated"
              required
            />
          </Col>
        </Form.Group> */}
        <Button type="submit" className="px-5 mt-5">
          Open Ticket
        </Button>
      </Form>
    </div>
  );
}

export default NewTicketForm;