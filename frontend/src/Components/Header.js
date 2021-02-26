import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {

  const history = useHistory();

  const logOut = () => {
    history.push("/");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand>Ticket System</Navbar.Brand>
        <NavbarToggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {/* <Link to="/dashboard">Dashboard</Link>
            <Link to="/ticketList">Tickets</Link>
            <Link to="">Logout</Link> */}
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ticketList">
              <Nav.Link>Tickets</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={logOut}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
