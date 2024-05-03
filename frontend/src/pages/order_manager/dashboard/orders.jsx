import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  // Filter completed orders based on search term
  const filteredOrders = orders.filter(order =>{
    const orderCreatedDate = new Date(order.createdAt).toLocaleDateString();
    const searchTerm = searchQuery.toLowerCase().trim();
    return  (
      order.orderid.includes(searchTerm) ||
      orderCreatedDate.includes(searchTerm) || 
      order.rider?.includes(searchTerm)
    );
    
  });

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

  
  

  return (
    <div>
      <h1>Orders</h1>
      
      <div className="searchpart">
      <input
                style={{borderRadius:'40px', padding:'10px', paddingLeft:'20px'}}
                  type="text"
                  placeholder="Search by Order ID or Date (MM/DD/YYYY)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  
                />
      </div><br /><br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Delivery Address</th>
            <th>Total Price</th>
            <th>Rider</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        
            
              
                    {filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderid}</td>
                        <td>{order.createdAt.split('T')[0]}</td>
                        <td>{order.customerid}</td>
                        <td>{order.customername}</td>
                        <td>{order.deliveryaddress}</td>
                        <td>{order.totalprice}</td>
                        <td>{order.rider}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))
                  }
              
            
         
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;