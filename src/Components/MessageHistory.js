import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function MessageHistory({ message }) {
    
    console.log(message);
    if (!message) return null;
    return message.map((row, i) => (
      <Container key={i} className="my-4 message-history">
        <Row className="font-weight-bold text-secondary d-flex flex-column">
          <Col>{row.messageBy}</Col>
          <Col>{row.date}</Col>
        </Row>
        <Row>
          <Col className="text-secondary ">
              <div className="message">Message {row.message}</div>
          </Col>
        </Row>        
      </Container>
    ));
}

export default MessageHistory;