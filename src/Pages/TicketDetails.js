import React from 'react';
import { Container, Row, Col} from "react-bootstrap";
import BreadCrumb from '../Components/BreadCrumb';

function TicketDetails() {
    return (
     <Container>
         <Row>
             <Col>
              <BreadCrumb page="Ticket"/>
             </Col>
         </Row>
     </Container>
    )
}

export default TicketDetails;
