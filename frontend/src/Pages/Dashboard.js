import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import TicketTable from "../Components/TicketTable";
//import tickets from "../assets/dummy-data.json";
import BreadCrumb from "../Components/BreadCrumb";
import { fetchAllTickets } from "../Pages/redux-features/ticketListAction";


export default function Dashboard() {

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  console.log("ticketss", tickets);
   useEffect(() => {
    if (!tickets.length) {
       dispatch(fetchAllTickets());
    }
   }, [tickets, dispatch]);

  const openedTickets = tickets.filter((row) => row.status !== "Closed");
  const closedTickets = tickets.filter((row) => row.status === "Closed");
  const totalTickets = tickets.length;
   //console.log("openeed", closedTickets)
  return (
    <Container fluid>
      <Row>
        <Col>
          <BreadCrumb page="Dashboard" />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end mt-4">
          <Link to="/newTicket">
            <Button className="mr-2">Open New Ticket</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-row justify-content-center my-5">
          <div className="mr-5">Total Tickets: {totalTickets}</div> 
          <div className="mr-5">Opened Tickets: {openedTickets.length}</div>
          <div>Closed Tickets: {closedTickets.length}</div>
        </Col>
      </Row>
      <Row>
        <Col className="mx-4 mt-4">
          <h5>Recently Added Tickets</h5>
          {/* <h5>neeedsss fixinngggg</h5> */}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <TicketTable tickets={tickets} />
        </Col>
      </Row>
    </Container>
  );
}
