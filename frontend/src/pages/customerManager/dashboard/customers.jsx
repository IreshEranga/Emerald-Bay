import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from "axios";
import { generatePDF } from "../../../utils/GeneratePDF";


const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  
  
  //const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState({});
  /*const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    status: "",
    
  });*/

  useEffect(() => {
    // Fetch table reservations data when component mounts
    fetchCustomers();
    
  }, []);

  // Function to fetch table reservations data
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/customer");
      setCustomers(response.data);
      // Initially setting filteredReservations to all reservations
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error("Error fetching table reservations:", error);
    }
  };

  // Function to handle delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/customer/delete/${_id}`);
      fetchCustomers();
      toast.success('Customer deleted successfully!');
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error('Error deleting customer!');
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filtered data
    const filteredData = customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase())
        
      );
    });
    setFilteredCustomers(filteredData);
  };

  // Function to prepare data for PDF report
  const preparePDFData = () => {
    const title = "Customer  Report";
    const columns = ["Customer ID", "Name", "Phone", "Email", "Address", "Status"];
    const data = filteredCustomers.map(cutomer => ({
      "Customer ID": cutomer.customerId,
      "Name": cutomer.name,
      "Phone": cutomer.mobile,
      "Email": cutomer.email,
      "Address": cutomer.address,
      "Status": cutomer.status,
      
    }));
    const fileName = "Customer_Report";
    return { title, columns, data, fileName };
  };

  // Function to handle downloading PDF report
  const downloadPDF = () => {
    const { title, columns, data, fileName } = preparePDFData();
    generatePDF(title, columns, data, fileName);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Customers
      </h1>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      {/* Search Form */}
      <Form className="mt-3">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by customer name or Email"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {/* Table to display previous vip room reservations */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.customerId}</td>
              <td>{customer.name}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.status}</td>
              
              <td style={{ display: "flex" }}>
                
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDelete(customer._id)} style={{marginRight:'20px'}}>
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

export default Customers;