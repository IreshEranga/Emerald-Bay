import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdDownload, IoMdTrash } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from "axios";
import { generatePDF } from "../../../utils/GeneratePDF";
import Swal from 'sweetalert2';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/customer");
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      // Use SweetAlert for confirmation
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this customer data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/customer/delete/${_id}`);
        fetchCustomers();
        toast.success('Customer deleted successfully!');
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error('Error deleting customer!');
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredData = customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredCustomers(filteredData);
  };

  const preparePDFData = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const title = `Customer Report - ${formattedDate}`;
    const columns = ["Customer ID", "Name", "Phone", "Email", "Address", "Status"];
    const data = filteredCustomers.map(customer => ({
      "Customer ID": customer.customerId,
      "Name": customer.name,
      "Phone": customer.mobile,
      "Email": customer.email,
      "Address": customer.address,
      "Status": customer.status,
    }));
    const fileName = "Customer_Report";
    return { title, columns, data, fileName };
  };
  
  const downloadPDF = () => {
    const { title, columns, data, fileName } = preparePDFData();
    generatePDF(title, columns, data, fileName);
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Customers
      </h1>

      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

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

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
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
