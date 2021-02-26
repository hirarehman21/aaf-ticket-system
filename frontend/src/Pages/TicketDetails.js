import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button} from "react-bootstrap";
import BreadCrumb from '../Components/BreadCrumb';
import tickets from '../assets/dummy-data.json';
import MessageHistory from '../Components/MessageHistory';
import TicketReply from '../Components/TicketReply';
import { useParams } from 'react-router-dom';

// const ticket = tickets[0];

function TicketDetails() {

  const { tId } = useParams();

  const [message, setMessage] = useState('');
  const [ticket, setTicket] = useState('');

    useEffect(() => {
        for (let i = 0; i < tickets.length; i++) {
          if (tickets[i].id == tId) {
            setTicket(tickets[i])
            continue
          }
          
        }
    }, [message, tId])

    const handleOnChange = e => {
        setMessage(e.target.value);
    };

    const handleOnSubmit = () => {
        alert('Form submitted')
    };

    return (
      <Container>
        <Row>
          <Col>
            <BreadCrumb page="Ticket" />
          </Col>
        </Row>
        <Row>
          <Col className="text-secondary">
            {tId}
            <h6>Complaint: {ticket.complaint}</h6>
            <h6>Opened on: {ticket.openedAt}</h6>
            <h6>Status: {ticket.status}</h6>
          </Col>
          <Col className="text-right">
            <Button>Close Ticket</Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="">
            <MessageHistory message={ticket.history} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
         <TicketReply msg={message} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit}/>
          </Col>
        </Row>
      </Container>
    );
}

export default TicketDetails;
