import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useDeliverRequestCountForRider } from "../../../hooks/useOrderData";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";


const Dashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: orderData } = useDeliverRequestCountForRider();
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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

    fetchOrders(); 
  }, [user]);

  // Function to handle editing a reservation
  const handleEdit = (order) => {
    // Implement your edit logic here
  };

  // Function to handle deleting a reservation
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/delete/${orderId}`);
      toast.success('Order deleted successfully');
      // Refetch orders after deletion
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order');
    }
  };

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              {/* Total Requests */}
              <h5 className="card-title">🚲 Total Delivery Count</h5>
              <p className="card-text fs-4 fw-bold">
                {/* show count */}
                
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Table to display delivery requests */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Contact</th>
            <th>Delivery Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderid}</td>
              <td>{order.customerid}</td>
              <td>{order.customername}</td>
              <td>{/* Contact details */}</td>
              <td>{order.deliveryaddress}</td>
              <td style={{ display: "flex" }}>
                {/* Edit button */}
                <Button variant="info" className="mr-2" onClick={() => handleEdit(order)} style={{marginRight:'10px', marginLeft:'20px'}}>
                  <IoMdCreate />
                </Button>
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDelete(order._id)} style={{marginRight:'20px'}}>
                  <IoMdTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default Dashboard;
