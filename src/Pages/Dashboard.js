import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TicketTable from "../Components/TicketTable";
import tickets from "../assets/dummy-data.json";
import BreadCrumb from "../Components/BreadCrumb";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Container fluid>
      <Row>
          <Col>
          <BreadCrumb page="Dashboard"/>
          </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end mt-4">
          <Link to="/newTicket"><Button className="mr-2">Open New Ticket</Button></Link>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-row justify-content-center my-5">
          <div className="mr-5">Total Tickets: 50</div>
          <div className="mr-5">Opened Tickets: 2</div>
          <div>Closed Tickets: 10</div>
        </Col>
      </Row>
      <Row>
        <Col className="mx-4 mt-4">
          <h5>Recently Added Tickets</h5>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <TicketTable tickets={tickets}/>
        </Col>
      </Row>
    </Container>
  );
}
