import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/EMERALDBAYLOGO.png';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import { useAuthStore } from '../store/useAuthStore';


function Navbar_customer({ isAuthenticated, user }) {
  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));
  const handleLogout = () => {
    localStorage.removeItem('customerLogin');
    logout();
    window.location.href = "/login";
  };

  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary" style={{ fontSize: '25px', height: '150px' }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="logo" width={'140px'} height={'120px'} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Nav className="me-auto my-2 my-lg-0 ms-auto" style={{ maxHeight: '100px', gap: '60px', textAlign: 'left'}} navbarScroll>
            <LinkContainer to="/customer">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer_menu">
              <Nav.Link>Menu</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer_reservations">
              <Nav.Link style={{ marginRight: '100px' }}>Reservations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/view_cart">
              <Nav.Link style={{ marginLeft: '200px' }}>
                <FaShoppingCart size={24} />
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title={<FaUser size={24} />} id="basic-nav-dropdown">
              <LinkContainer to="/view_profile">
                <NavDropdown.Item>View Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/edit_profile">
                <NavDropdown.Item>Edit Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/membership">
                <NavDropdown.Item>Membership</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/view_orders">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/view_reservations">
                <NavDropdown.Item>Reservations</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/logout">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_customer;