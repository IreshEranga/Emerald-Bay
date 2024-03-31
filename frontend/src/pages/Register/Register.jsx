import './Register.css';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Container className='all'>
      <Row className="justify-content-md-center-5">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Registration Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label >Name:</Form.Label>
              <Form.Control className='name1'
                type="text" 
                placeholder="Enter name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control className='name2'
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control  className='name3'
                type="text" 
                placeholder="Enter address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control  className='name4'
                type="text" 
                placeholder="Enter phone number" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add your image:</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control  className='name5'
                type="password" 
                placeholder="Enter password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Re-enter Password:</Form.Label>
              <Form.Control  className='name6'
                type="password" 
                placeholder="Re-enter password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
<br></br>

<p>Have an Account? <Link to="/login">Login here</Link> </p>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};







export default Register;
