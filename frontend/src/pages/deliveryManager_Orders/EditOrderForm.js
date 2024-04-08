/*import React, { useState, useEffect } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the update function with the order details, selected rider, and status
    onClose({ ...order, rider: selectedRider, status: orderStatus });
    setShowForm(false); // Hide the form after submission
  };

  const handleClose = () => {
    setShowForm(false); // Hide the form when the close button is clicked
  };

  if (!showForm) {
    return null; // Don't render the form if showForm is false
  }

  return (
    <Form style={{ border: '1px solid black', width: '50%', marginLeft: '30px', padding: '10px' }} onSubmit={handleSubmit}>
      <Form.Group controlId="riderSelect">
        <Form.Label>Update Order:</Form.Label>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
        Close
      </Button>
    </Form>
  );
};

export default EditOrderForm;
*/

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
    // Call the update function with the order details, selected rider, and status
    const updatedOrder = { ...order, rider: selectedRider, status: 'ongoing' };
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
        body: JSON.stringify({ status: 'ongoing', rider: selectedRider }),
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
    <Form style={{ border: '1px solid black', width: '50%', marginLeft: '30px', padding: '10px' }} onSubmit={handleSubmit}>
      <Form.Group controlId="riderSelect">
        <Form.Label>Update Order:</Form.Label>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
        Close
      </Button>
    </Form>
  );
};

export default EditOrderForm;
