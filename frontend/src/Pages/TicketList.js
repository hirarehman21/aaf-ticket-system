import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./redux-features/ticketListAction";

import { Container, Row, Col } from "react-bootstrap";
import BreadCrumb from "../Components/BreadCrumb";
import Search from "../Components/Search";
import TicketTable from "../Components/TicketTable";
//import tickets from "../assets/dummy-data.json";

export default function TicketList() {
  const dispatch = useDispatch();

  //const [str, setStr] = useState("");
  //const [dispTicket, setDispTicket] = useState(tickets);


  useEffect(() => {
    // executes once when the component is loading

    // dispatch action
    dispatch(fetchAllTickets());
  }, [dispatch]);
 // }, [str, dispatch]);

  //   dispatch(fetchAllTickets());
  // }, [str, dispTicket]);

  // const handleOnChange = (e) => {    
  //   const { value } = e.target;
  //   setStr(value);    
  //   searchTicket(value);
  // };

  // const searchTicket = searchStr => {
  //   const displayTickets = tickets.filter((row) =>
  //     row.complaint.toLowerCase().includes(searchStr.toLowerCase())
  //   );
  //   console.log(displayTickets);
    //setDispTicket(displayTickets);
 // }

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
          {/* <Search handleOnChange={handleOnChange} str={str} /> */}
          <Search/>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <h4>Tabs...</h4>
        </Col>
      </Row> */}
      {/* <hr/> */}
      <Row className="mt-5">
        <Col>
          {/* <TicketTable tickets={dispTicket} /> */}
          <TicketTable  />
        </Col>
      </Row>
    </Container>
  );
}
