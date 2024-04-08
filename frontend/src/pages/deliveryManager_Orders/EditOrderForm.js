import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditOrderForm = ({ order = {}, onClose }) => {
  const [selectedRider, setSelectedRider] = useState(order.rider || '');
  const [orderStatus, setOrderStatus] = useState(order.status || '');
  const [riders, setRiders] = useState([]);
  const [showForm, setShowForm] = useState(true);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update rider status in rider database
      const response = await fetch(`http://localhost:8000/api/riders/update/${selectedRider}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'On Ride' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update rider status');
      }

      // Update order status and rider in order database
      await fetch(`http://localhost:8000/api/orders/update/${order.orderid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'ongoing', rider: selectedRider }),
      });

      // Call the onClose function with the updated order data
      onClose({ ...order, rider: selectedRider, status: 'ongoing' });
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle the error as needed (e.g., show a message to the user)
    }
  };

  const handleClose = () => {
    setShowForm(false); // Hide the form when the close button is clicked
  };

  if (!showForm) {
    return null; // Don't render the form if showForm is false
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="riderSelect">
        <Form.Label>Select a Rider:</Form.Label>
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
      <Form.Group controlId="statusInput">
        <Form.Label>Status:</Form.Label>
        <Form.Control
          type="text"
          value={orderStatus}
          onChange={(event) => setOrderStatus(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Form>
  );
};

export default EditOrderForm;
