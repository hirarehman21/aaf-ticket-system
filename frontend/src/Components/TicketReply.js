import React from 'react';
import { Form, Button } from 'react-bootstrap';

function TicketReply({ msg, handleOnChange, handleOnSubmit }) {
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Label>Reply</Form.Label>
      <Form.Text>Your Reply here</Form.Text>
      <Form.Control
        as="textarea"
        row="5"
        name="reply"
        value={msg}
        onChange={handleOnChange}
      />
      <div className="text-right my-4">
        <Button type="submit">Reply</Button>
      </div>
    </Form>
  );
}

export default TicketReply;