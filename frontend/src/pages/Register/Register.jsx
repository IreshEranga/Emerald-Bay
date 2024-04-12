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
          confirmPassword: '',
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
    }else if (data.password.trim().length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <Container className='all'>
      <NavBar/>
      <Row className="justify-content-md-center-5" style={{border:'1px solid black', marginTop:'15px', marginBottom:'40px', padding:'30px', width:'80%', marginLeft:'100px'}}>
        <Col xs={12} md={6}>
          <h2 className="mb-4" style={{marginLeft:'200px'}}>Registration Form</h2>
          
          <Form onSubmit={handleSubmit} style={{marginLeft:'100px'}}>
            
        
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

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password :</Form.Label>
              <Form.Control
                type="password" 
                placeholder="Confirm password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
              {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
            </Form.Group> <br />

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            
          </Form>
          <p className="mt-3" style={{marginLeft:'100px'}}>Have an Account? <Link to="/login">Login here</Link></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
