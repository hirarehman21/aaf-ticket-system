import React from 'react';
import { Form, Row, Col, Button} from 'react-bootstrap';

function NewTicketForm({ handleOnSubmit }) {
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Complaint
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="complaint"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Complaint"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Created by
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="CreatedBy"
              // value={pass}
              // onChange={(e) => setPass(e.target.value)}
              //   onChange={handleOnChange}
              placeholder="Created by"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Date Opened
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="dateCreated"
              // value={pass}
              // onChange={(e) => setPass(e.target.value)}
              //   onChange={handleOnChange}
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
              // value={pass}
              // onChange={(e) => setPass(e.target.value)}
              //   onChange={handleOnChange}
              placeholder="Campus/Department"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
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
        </Form.Group>
        <Button type="submit" className="px-5 mt-5">
          Open
        </Button>
      </Form>
    </div>
  );
}

export default NewTicketForm;