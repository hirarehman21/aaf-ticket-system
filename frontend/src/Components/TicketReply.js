import React, {useState} from 'react';
import { Form, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { replyOnTicket } from "../Pages/redux-features/ticketListAction";

function TicketReply({ _id}) {

  const dispatch = useDispatch();
  const {user:{name}} = useSelector(state => state.user)
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const msgObj = {
      message,
      sender: name,
    };

     dispatch(replyOnTicket(_id, msgObj));
     setMessage("");
    //alert("Form submitted");
  };
  
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Label>Reply</Form.Label>
      <Form.Text>Your Reply here</Form.Text>
      <Form.Control
        value={message}
        onChange={handleOnChange}
        as="textarea"
        row="5"
        name="reply"
      />
      <div className="text-right my-4">
        <Button type="submit">Reply</Button>
      </div>
    </Form>
  );
}

export default TicketReply;