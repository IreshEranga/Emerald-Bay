import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from 'react-hot-toast';
import { Button, Table } from "react-bootstrap";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import { generatePDF } from "../../../utils/GeneratePDF";
import "./profileview.css";

const Dashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [orders, setOrders] = useState([]);
  const [totalDeliveryCount, setTotalDeliveryCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.orderid.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.deliveryaddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.createdAt.split('T')[0].toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );;

  /*const handleDownloadPDF = () => {
    generatePDF(
      "Orders Report", // Title of the PDF
      ["Order ID", "Customer ID", "Customer Name", "Delivery Address", "Status"], // Column headers
      orders=>[{"Order ID":orders.orderid}], // Data to be included in the PDF
      "Orders_Report", // File name for download
      "Your Restaurant Name" // Restaurant name (optional)
    );
  };*/
  const handleDownloadPDF = async () => {
    try {
     
      const dataForPDF = filteredOrders.map(order => ({
        "Order ID": order.orderid,
        "Date": order.createdAt.split('T')[0],
        "Customer ID": order.customerid,
        "Customer Name": order.customername,
        "Delivery Address": order.deliveryaddress,
        "Status": order.status,
      }));
      generatePDF(
        `Delivery Report - ${user.name}`,
        ["Order ID","Date", "Customer ID", "Customer Name", "Delivery Address", "Status"],
        dataForPDF,
        `Delivery Report for ${user.name} ${searchQuery}`,
        "Emerald Bay Restaurant"
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF');
    }
  };


  const handleEditStatus = async (orderId) => {
    try {
      await axios.put(`http://localhost:8000/api/orders/update/status/${orderId}`);
      toast.success('Order status updated successfully');
      // Refetch orders after status update
      fetchOrdersForRider();
     setIsButtonDisabled(true);
      console.log('Button disabled:', isButtonDisabled); 
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
        {/* Download PDF report */}
        <Button variant="success" className="m-1" onClick={handleDownloadPDF} style={{width:'200px', height:'50px', marginLeft:'10px'}}>
            <IoMdDownload className="mb-1" /> <span>Download Report</span>
          </Button>

          <input
                      type="search"
                      name="search"
                      id="search"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search by Order Id, Delivery Address and (YYYY-MM-DD)"
                      style={{ width: "480px", border: '1px solid gray', padding: '20px', borderRadius: '30px', position:'relative', marginLeft:'600px', marginTop:'-120px', zIndex:'1', height:'20px' }}
                    />
      </div>

      {/* Table to display delivery requests */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Delivery Address</th>
            <th>Status</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredOrders.sort((a,b) => b.orderid - a.orderid)
          .map((order) => (
            <tr key={order._id}>
              <td>{order.orderid}</td>
              <td>{order.createdAt.split('T')[0]}</td>
              <td>{order.customerid}</td>
              <td>{order.customername}</td>
              <td>{order.deliveryaddress}</td>
              <td> <span className={`badge ${
                      order.status === "ongoing"
                        ? "bg-warning"
                        : order.status === "completed"
                        ? "bg-success"
                        : "bg-danger"
                    }`} style={{marginLeft:'50px',fontSize:'15px'}}>
                      {order.status}
                    </span>
              </td> 
              <td style={{ display: "flex" }}>
                <Button
                  variant="warning"
                  className={`mr-2 ${isButtonDisabled ? 'btn-disabled' : ''}`}
                  onClick={() => handleEditStatus(order._id)}
                  style={{marginLeft: '40px'}}
                  disabled={isButtonDisabled} // Disable the button based on state
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
