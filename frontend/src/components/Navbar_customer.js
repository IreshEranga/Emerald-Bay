import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../assets/EMERALDBAYLOGO.png';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing icons


function Navbar_customer({ isAuthenticated, user, logout }) {
  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary" style={{ fontSize: '25px', height: '170px' }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="logo" width={'180px'} height={'150px'} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{ marginLeft: '250px' }}>

          <Nav className="me-auto my-2 my-lg-0 ms-auto" style={{ maxHeight: '100px', gap: '40px', textAlign: 'left' }} navbarScroll>
            <LinkContainer to="/customer">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer_menu">
              <Nav.Link>Menu</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer_reservations">
              <Nav.Link>Reservations</Nav.Link>
            </LinkContainer>
            {/* Cart Icon */}
            <LinkContainer to="/view_cart">
              <Nav.Link>
                <FaShoppingCart size={24} />
              </Nav.Link>
            </LinkContainer>
            {/* Profile Icon */}
            <LinkContainer to="/view_profile">
              <Nav.Link>
                <FaUser size={24} />
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_customer;