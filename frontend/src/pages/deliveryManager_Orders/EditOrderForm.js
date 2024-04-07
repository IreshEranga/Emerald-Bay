import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const EditOrderForm = ({ order, onClose }) => {
  const [selectedRider, setSelectedRider] = useState(order.rider);
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/riders/get/available');
        const data = await response.json();
        setRiders(data.availableRiders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRiders();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the update function with the order details and selected rider
    onClose(order, selectedRider);
  };

  return (
    <Form onSubmit={handleSubmit} style={{border:'1px solid black', width:'50%', marginLeft:'30px', padding:'10px'}}>
      <Form.Group controlId="riderSelect">

        <Form.Label>Update Order : </Form.Label> <br/><br/><br/>
        <Form.Label>Select Rider</Form.Label>
        <Form.Control
          as="select"
          value={selectedRider}
          onChange={(event) => setSelectedRider(event.target.value)}
        >
          <option value="">Select a rider</option>
          {riders.map((rider) => (
            <option key={rider._id} value={rider._id}>
              {rider.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditOrderForm;