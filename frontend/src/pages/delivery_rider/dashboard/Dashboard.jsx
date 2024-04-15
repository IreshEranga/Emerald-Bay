import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from 'react-hot-toast';
import { Button, Table } from "react-bootstrap";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [orders, setOrders] = useState([]);
  const [totalDeliveryCount, setTotalDeliveryCount] = useState(0);

  useEffect(() => {
    const fetchOrdersForRider = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/rider/${user.name}`);
        setOrders(response.data.orders);
        // Calculate and set total delivery count
        const count = response.data.orders.length;
        setTotalDeliveryCount(count);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders');
      }
    };

    if (user && user.role === 'RIDER') {
      fetchOrdersForRider();
    }
  }, [user]);

  const handleEditStatus = async (orderId) => {
    try {
      await axios.put(`http://localhost:8000/api/orders/update/status/${orderId}`);
      toast.success('Order status updated successfully');
      // Refetch orders after status update
      fetchOrdersForRider();
    } catch (error) {
      console.error('Error updating order status:', error);
      //toast.error('Error updating order status');
    }
  };

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}  -   {user.name}</strong>
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              {/* Total Requests */}
              <h5 className="card-title">🚲 Total Delivery Count</h5>
              <p className="card-text fs-4 fw-bold">
                {totalDeliveryCount}
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
            <th>Delivery Address</th>
            <th>Status</th> {/* Added Status column */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/*orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderid}</td>
              <td>{order.customerid}</td>
              <td>{order.customername}</td>
              <td>{order.deliveryaddress}</td>
              <td>{order.status}</td> 
              <td style={{ display: "flex" }}>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => handleEditStatus(order._id)}
                  style={{marginLeft: '40px'}}
                >
                  Edit Status
                </Button>
              </td>
            </tr>
          ))*/}
          {orders.sort((a,b) => b.orderid - a.orderid)
          .map((order) => (
            <tr key={order._id}>
              <td>{order.orderid}</td>
              <td>{order.customerid}</td>
              <td>{order.customername}</td>
              <td>{order.deliveryaddress}</td>
              <td>{order.status}</td> 
              <td style={{ display: "flex" }}>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => handleEditStatus(order._id)}
                  style={{marginLeft: '40px'}}
                >
                  Edit Status
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
