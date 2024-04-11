import './Register.css';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
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
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errorsObj = validateForm(formData);

    if (Object.keys(errorsObj).length === 0) {
      try {
        const res = await axios.post('http://localhost:8000/customer/add', formData);
        console.log(res.data); // Handle success response
        setFormData({
          name: '',
          email: '',
          address: '',
          mobile: '',
          password: '',
        });
        toast.success("Customer registered successfully!!");
        navigate('/login'); // Navigate to login page after successful registration
        
      } catch (err) {
        setErrors(err.response.data.errors);
        toast.error("Error in creating customer !");
      }
    } else {
      setErrors(errorsObj);
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
    if (!data.address.trim()) {
        errors.address = "Address is required";
    }
    if (!data.password.trim()) {
        errors.password = "Password is required";
    }
    return errors;
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
              <Form.Control
                type="text" 
                placeholder="Enter full name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
              {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address :</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Enter address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
              {errors.address && <Form.Text className="text-danger">{errors.address}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Enter phone number" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                required 
              />
              {errors.mobile && <Form.Text className="text-danger">{errors.mobile}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password :</Form.Label>
              <Form.Control
                type="password" 
                placeholder="Enter password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            
          </Form>
          <p className="mt-3">Have an Account? <Link to="/login">Login here</Link></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
