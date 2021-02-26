import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BreadCrumb from "../Components/BreadCrumb";
import Search from "../Components/Search";
import TicketTable from "../Components/TicketTable";
import tickets from "../assets/dummy-data.json";

export default function TicketList() {
  const [str, setStr] = useState("");

  return (
    <Container>
      <Row>
        <Col>
          <BreadCrumb page="Ticket List" />
        </Col>
      </Row>
      <Row>
        {/* <Col>
            <Button>Open New Ticket</Button>
          </Col> */}
        <Col className="text-right col-6">
          <Search str={str} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Tabs...</h4>
        </Col>
      </Row>
      {/* <hr/> */}
      <Row className="mt-5">
        <Col>
          <TicketTable tickets={tickets} />
        </Col>
      </Row>
    </Container>
  );
}
