{/*import logo from '../assets/EMERALDBAYLOGO.png'
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
  return (
    <Navbar bg='dark' expand="lg" className="bg-body-tertiary" style={{fontSize:'25px'}}>
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} alt="logo" width={'200px'} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 ms-auto"
            style={{ maxHeight: '100px', gap: '40px', textAlign: 'left' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            {/*<NavDropdown title="Menu" id="navbarScrollingDropdown" >
              <NavDropdown.Item href="#action3"  style={{ fontSize: '22px' }}>Appetizer</NavDropdown.Item>
              <NavDropdown.Item href="#action4"  style={{ fontSize: '22px' }}>
                Salads
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5"  style={{ fontSize: '22px' }}>
                Side Order
              </NavDropdown.Item>
              <NavDropdown.Item href="#action6"  style={{ fontSize: '22px' }}>
                Soup
              </NavDropdown.Item>
              <NavDropdown.Item href="#action7"  style={{ fontSize: '22px' }}>
                Lunch & Dinner
              </NavDropdown.Item>
              <NavDropdown.Item href="#action7"  style={{ fontSize: '22px' }}>
                Dessert
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action8"  style={{ fontSize: '22px' }}>
                Beverages
              </NavDropdown.Item>
  </NavDropdown>*/}

  /*
            <Nav.Link href="#action9">Menu</Nav.Link>
            <Nav.Link href="#action10">Reservations</Nav.Link>
            <Nav.Link href="#action11">Gallery</Nav.Link>
            <Nav.Link href="#action12">Contact</Nav.Link>
          </Nav>
         
            {/*<Button variant="outline-success"  style={{ fontSize: '25px' }}>Order Online</Button>}

            /*
            <div className="container d-flex flex-column align-items-center">
      {!isAuthenticated ? (
        <div className="flex-row d-flex justify-content-center mt-5 w-100">
          <button className="btn btn-primary col-2 m-2">
            <a href="/login" className="text-white">
              Login
            </a>
          </button>
        </div>
      ) : (
        <div className="flex-row d-flex justify-content-center mt-5 w-100">
          <button className="btn btn-primary col-2 m-2">
            <a
              href={user.role === "ADMIN" ? "/admin" : "/supplier"}
              className="text-white"
            >
              Dashboard
            </a>
          </button>
          <button onClick={logout} className="btn btn-primary col-2 m-2">
            Logout
          </button>
        </div>
      )}   
      
      </div>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
*/

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../assets/EMERALDBAYLOGO.png';

function NavBar({ isAuthenticated, user, logout }) {
  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary" style={{ fontSize: '25px' }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="logo" width={'200px'} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 ms-auto" style={{ maxHeight: '100px', gap: '40px', textAlign: 'left' }} navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            <Nav.Link href="#action9">Menu</Nav.Link>
            <Nav.Link href="#action10">Reservations</Nav.Link>
            <Nav.Link href="#action11">Gallery</Nav.Link>
            <Nav.Link href="#action12">Contact</Nav.Link>
          </Nav>
          <div className="container d-flex flex-column align-items-center">
            {!isAuthenticated ? (
              <Button variant="primary" className="m-2" href="/login">
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
