import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [activeSection, setActiveSection] = useState('pending');

  useEffect(() => {
    // Function to fetch orders from your API or database
    const fetchOrders = async () => {
      try {
        // Make a fetch call or use axios or any other library to fetch data
        const response = await fetch('http://localhost:8000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Call the fetchOrders function when the component mounts
  }, []);

  const pendingOrders = orders.filter(order => order.status === 'pending');

  // Function to handle section change
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/orders/search?orderId=${searchTerm}&date=${searchDate}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error searching orders:', error);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <Form>
        <Form.Group controlId="orderId">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Delivery Address</th>
            <th>Total Price</th>
            <th>Rider</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {activeSection === 'pending' && (
            <section className='pendingOrders'>
              <div className="pendingordertable">
                    {pendingOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>{order.totalprice}</td>
                        <td>{order.rider}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))
                  }
              </div>
            </section>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;