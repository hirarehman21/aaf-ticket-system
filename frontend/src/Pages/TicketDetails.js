import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Spinner, Alert} from "react-bootstrap";
import BreadCrumb from '../Components/BreadCrumb';
//import tickets from '../assets/dummy-data.json';
import MessageHistory from '../Components/MessageHistory';
import TicketReply from '../Components/TicketReply';
import { useParams } from 'react-router-dom';

import { fetchOneTicket, closeTicket } from "../Pages/redux-features/ticketListAction";
import { resetResponseMsg } from "../Pages/redux-features/ticketListSlice";

// const ticket = tickets[0];

function TicketDetails() {

  const { tId } = useParams();
  //console.log(tId);
  const dispatch = useDispatch();
  // provides the whole state of the application from the redux store
  const { isLoading, error, selectedTicket, replyMsg, replyTicketError } = useSelector((state) => state.tickets);

  // const [message, setMessage] = useState('');
  // const [ticket, setTicket] = useState('');
  console.log("selected", selectedTicket.conversation);
  useEffect(() => {
    dispatch(fetchOneTicket(tId));
    // function runs everytime component is mount
     return () => {
       (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
     };
    // for (let i = 0; i < tickets.length; i++) {
    //   if (tickets[i].id === tId) {
    //     setTicket(tickets[i])
    //     continue
    //   }
    // }
    // }, [message, tId, dispatch])
  }, [tId, dispatch, replyMsg, replyTicketError]);
  //console.log("message",message);
    

    return (
      <Container>
        <Row>
          <Col>
            <BreadCrumb page="Ticket" />
          </Col>
        </Row>
        <Row>
          <Col>
            {isLoading && <Spinner variant="primary" animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {replyTicketError && (
              <Alert variant="danger">{replyTicketError}</Alert>
            )}
            {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
          </Col>
        </Row>
        <Row>
          <Col className="text-secondary">
            {/* {tId} */}
            <h6>Complaint: {selectedTicket.complaint}</h6>
            <h6>
              Opened on:
              {selectedTicket.openedAt &&
                new Date(selectedTicket.openedAt).toLocaleString()}
            </h6>
            <h6>Status: {selectedTicket.status}</h6>
            <h6>Department: {selectedTicket.department}</h6>
          </Col>
          <Col className="text-right">
            <Button
              onClick={() => dispatch(closeTicket(tId))}
              disabled={selectedTicket.status === "Closed"}
            >
              Close Ticket
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            hdfwhefiw
            {/* {selectedTicket.conversation && console.log("inside console", selectedTicket.conversation)} */}
            {selectedTicket.conversation && (
              <MessageHistory message={selectedTicket.conversation} />
            )}
          </Col>
        </Row>
        {/* <Row className="mt-4">
          <Col>
            {selectedTicket.conversations && (
              <MessageHistory msg={selectedTicket.conversations} />
            )}
          </Col>
        </Row> */}
        <hr />
        <Row>
          <Col>
            <TicketReply
              _id={tId}
              // msg={message}
              // handleOnChange={handleOnChange}
              // handleOnSubmit={handleOnSubmit}
            />
          </Col>
        </Row>
      </Container>
    );
}

export default TicketDetails;
