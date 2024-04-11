import './Register.css';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar';
import axios from 'axios'; 
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    mobile: '',
    password: '',
   /* confirmPassword: ''*/
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    //const errorsObj = validateForm(formData);
    
      try {
        const res = await axios.post('http://localhost:8000/customer/add', formData);
        console.log(res.data); // Handle success response
        toast.success("Customer register Success!!");
      } catch (err) {
        setErrors(err.response.data.errors);
        toast.error("Error in creating customer !");
      }
    
  };

  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name.trim()) {
        errors.name = "Name is required";
    }
    if (!data.mobile.trim()) {
        errors.mobile = "Contact number is required";
    } else if (!/^\d{10}$/.test(data.mobile.trim())) {
        errors.mobile = "Invalid contact number";
    }
    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(data.email.trim())) {
        errors.email = "Invalid email address";
    }
    if (!data.address) {
        errors.address = "Address is required";
    }
    // Check if passwords match
    /*if (password !== confirmPassword) {
      errors.password = "Passwords do not match";
    }
    return errors;*/
};
  

  return (

    <Container className='all'>
      <NavBar/>
      <Row className="justify-content-md-center-5" style={{border:'1px solid black', marginTop:'15px'}}>
        <Col xs={12} md={6}>
          <h2 className="mb-4">Registration Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label >Full Name :</Form.Label>
              <Form.Control className='name1'
                type="text" 
                placeholder="Enter full name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email :</Form.Label>
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
              <Form.Label>Address :</Form.Label>
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
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

          

            <Form.Group controlId="password">
              <Form.Label>Password :</Form.Label>
              <Form.Control  className='name5'
                type="password" 
                placeholder="Enter password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            {/*<Form.Group controlId="confirmPassword">
              <Form.Label>Re-enter Password :</Form.Label>
              <Form.Control  className='name6'
                type="password" 
                placeholder="Re-enter password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
  </Form.Group>*/}
<br></br>

          <p>Have an Account? <Link to="/login"> Login here</Link> </p>

            <Button variant="primary" type="submit" onClick={handleSubmit} style={{width: '200px', padding: '10px', backgroundColor:'#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'170px'}}>
              Sign Up
            </Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
};








export default Register;