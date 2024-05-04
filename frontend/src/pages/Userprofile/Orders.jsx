import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const User_Orders = () => {
  const { user } = useAuthStore(); // Assuming useAuthStore provides user information
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("user ",user._id);
  useEffect(() => {
    const fetchOrdersByCustomerId = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/customer/orders/${user._id}`);
        setOrders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchOrdersByCustomerId();
  }, [user._id]);

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error fetching orders: {error}</p>;
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Navbar_customer />
      <div className="profile-container">
        <h1 style={{ paddingLeft: '140px', paddingRight: '10px', color: 'maroon', fontFamily: 'Times New Roman, Times, serif', fontSize:'70px' }}>My Orders</h1><br/><br/>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderid}</td>
              <td>{order.createdAt.split('T')[0]}</td>
              <td>{order.totalprice}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default User_Orders;