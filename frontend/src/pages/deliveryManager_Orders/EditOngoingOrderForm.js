

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditOngoingOrderForm = ({ order = {}, onClose }) => {
  const [selectedRider, setSelectedRider] = useState(order.rider || '');
  const [orderStatus, setOrderStatus] = useState(order.status || '');
  const [riders, setRiders] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const [showOngoingEditForm, setShowOngoingEditForm] = useState(false);

  const handleOngoingEdit = (order) => {
    setSelectedOrder(order);
    setShowOngoingEditForm(true);
  };
  

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
    // Call the update function with the order details, selected rider, and status
    const updatedOrder = { ...order, rider: selectedRider, status: 'completed' };
    onClose(updatedOrder);
    setShowForm(false); // Hide the form after submission

    // Update rider status in rider database
    try {
      await fetch(`http://localhost:8000/api/riders/update/${riderid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'On Ride' }),
      });
    } catch (error) {
      console.error('Error updating rider status:', error);
    }

    // Update order status and rider in order database
    try {
      await fetch(`http://localhost:8000/api/orders/update/${order.orderid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed', rider: selectedRider }),
      });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleClose = () => {
    setShowForm(false); // Hide the form when the close button is clicked
  };

  if (!showForm) {
    return null; // Don't render the form if showForm is false
  }

  return (
    <Form style={{ border: '1px solid black', width: '50%', marginLeft: '30px', padding: '10px', height
    :'250px', marginTop:'100px' }} onSubmit={handleSubmit}>
      <Form.Label>Update Order Status: {order.orderid}</Form.Label><br/><br/>
      
      <Form.Group controlId="statusInput">
        <Form.Label>Status:</Form.Label>
        <Form.Control
          type="text"
          value={orderStatus}
          onChange={(event) => setOrderStatus(event.target.value)}
        />
      </Form.Group><br/><br/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
        Close
      </Button>
    </Form>
  );
};

export default EditOngoingOrderForm;
