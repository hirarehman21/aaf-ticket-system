import React from 'react';
//import { useSelector } from 'react-redux'
  ;//import { Container, Row, Col } from 'react-bootstrap';

function MessageHistory({ message }) {
    
  console.log("messagehistory", message);
  if (!message) return null;

  //const {replyMsg} =  useSelector(state => state.tickets)

  return message.map((row, i) => (
    <div key={i} className="message-history mt-3">
      <div className="send font-weight-bold text-secondary">
        <div className="sender">{row.sender}</div>
        <div className="date">
          {row.repliedAt && new Date(row.repliedAt).toLocaleString()}
        </div>
      </div>
      <div className="message">{row.message}</div>
    </div>
  ));
    // return message.map((row, i) => (
    //   <Container key={i} className="my-4 message-history">
    //     <Row className="font-weight-bold text-secondary d-flex flex-column">
    //       <Col>{row.sender}</Col>
    //       <Col>{row.repliedAt}</Col>
    //     </Row>
    //     <Row>
    //       <Col className="text-secondary ">
    //         <div className="message">Message {row.message}</div>
    //       </Col>
    //     </Row>
    //   </Container>
    // ));
}

export default MessageHistory;