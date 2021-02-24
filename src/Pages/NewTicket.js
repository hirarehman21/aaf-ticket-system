import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import BreadCrumb from '../Components/BreadCrumb';
import NewTicketForm from '../Components/NewTicketForm';

export default function NewTicket() {
    return (
      <Container>
        <Row>
          <Col>
            <BreadCrumb page="New Ticket" />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewTicketForm/>
          </Col>
        </Row>
      </Container>
    );
}
