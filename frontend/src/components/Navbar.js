import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../assets/EMERALDBAYLOGO.png';
import {LinkContainer} from 'react-router-bootstrap';


function NavBar({ isAuthenticated, user, logout }) {
  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary" style={{ fontSize: '25px' , height:'150px' }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="logo" width={'150px'} height={'120px'}/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{marginLeft:'250px'}}>

          <Nav className="me-auto my-2 my-lg-0 ms-auto" style={{ maxHeight: '100px', gap: '40px', textAlign: 'left' }} navbarScroll>
          <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/menu">
              <Nav.Link>Menu</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reservations">
              <Nav.Link>Reservations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/gallery">
              <Nav.Link>Gallery</Nav.Link>
            </LinkContainer>
          </Nav>

          <div className="container d-flex flex-column align-items-center">
            {!isAuthenticated ? (
              <Button variant="primary" className="m-2" href="/login" style={{marginLeft:'50px'}}>
                Login
              </Button>
            ) : (
              <div className="flex-row d-flex justify-content-center mt-5 w-100">
                <Button variant="primary" className="col-2 m-2" href={user.role === 'ADMIN' ? '/admin' : '/supplier'}>
                  Dashboard
                </Button>
                <Button variant="primary" className="col-2 m-2" onClick={logout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
