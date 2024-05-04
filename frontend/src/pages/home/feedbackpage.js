// src/components/FeedbackForm.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'


const FeedbackForm = () => {




    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        delivery: '',
        taste: '',
        customerService: '',
        prices: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(localStorage.getItem('customerLogin') === 'true'){
         

        const formErrors = {};
        if (!feedback.name.trim()) {
            formErrors.name = 'Name is required';
        }
        if (!feedback.email.trim()) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(feedback.email)) {
            formErrors.email = 'Invalid email address';
        }
        if (!feedback.delivery) {
            formErrors.delivery = 'Please select delivery';
        }
        if (!feedback.taste) {
            formErrors.taste = 'Please select taste';
        }
        if (!feedback.customerService) {
            formErrors.customerService = 'Please select customer service';
        }
        if (!feedback.prices) {
            formErrors.prices = 'Please select prices';
        }
        if (!feedback.message.trim()) {
            formErrors.message = 'Message is required';
        }
       
        
        const response = await axios.post("http://localhost:8000/api/feedback/add",feedback)
        if(response.status === 200){
            alert("Feedback added")
            setFeedback({
                name: '',
                email: '',
                delivery: '',
                taste: '',
                customerService: '',
                prices: '',
                message: ''
            });
        }
        else if(response.status === 304
            
        ){
            alert("Failed to add feedback")
        }
    }else{
        alert("Please login to add feedback")
        window.location.href = "/login";
    }
    };

    return (
        <div className="form-container">
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={feedback.name}
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={feedback.email}
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                {/* Convert Delivery to Checkbox */}
                <Form.Group controlId="formDelivery">
                    <Form.Label>Delivery</Form.Label>
                    <div >
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="delivery"
                            value="excellent"
                            checked={feedback.delivery === 'excellent'}
                            onChange={handleChange}
                            
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="delivery"
                            value="good"
                            checked={feedback.delivery === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="delivery"
                            value="average"
                            checked={feedback.delivery === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="delivery"
                            value="poor"
                            checked={feedback.delivery === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                {/* Convert Taste to Checkbox */}
                <Form.Group controlId="formTaste">
                    <Form.Label>Taste</Form.Label>
                    <div >
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="taste"
                            value="excellent"
                            checked={feedback.taste === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="taste"
                            value="good"
                            checked={feedback.taste === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="taste"
                            value="average"
                            checked={feedback.taste === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="taste"
                            value="poor"
                            checked={feedback.taste === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                {/* Convert Customer Service to Checkbox */}
                <Form.Group controlId="formCustomerService">
                    <Form.Label>Customer Service</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="customerService"
                            value="excellent"
                            checked={feedback.customerService === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="customerService"
                            value="good"
                            checked={feedback.customerService === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="customerService"
                            value="average"
                            checked={feedback.customerService === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="customerService"
                            value="poor"
                            checked={feedback.customerService === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                {/* Convert Prices to Checkbox */}
                <Form.Group controlId="formPrices">
                    <Form.Label>Prices</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="prices"
                            value="excellent"
                            checked={feedback.prices === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="prices"
                            value="good"
                            checked={feedback.prices === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="prices"
                            value="average"
                            checked={feedback.prices === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="prices"
                            value="poor"
                            checked={feedback.prices === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group controlId="formOverallExperience">
                    <Form.Label>Overall Experience</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="overallExperience"
                            value="excellent"
                            checked={feedback.overallExperience === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="overallExperience"
                            value="good"
                            checked={feedback.overallExperience === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="overallExperience"
                            value="average"
                            checked={feedback.overallExperience === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="overallExperience"
                            value="poor"
                            checked={feedback.overallExperience === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your message"
                        name="message"
                        value={feedback.message}
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    

    );
};

export default FeedbackForm;
