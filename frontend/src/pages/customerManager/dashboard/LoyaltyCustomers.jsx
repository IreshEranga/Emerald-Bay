import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from "axios";
import { generatePDF } from "../../../utils/GeneratePDF";


const LoyaltyCustomers = () => {
  const [loyaltycustomers, setLoyaltyCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLoyaltyCustomers, setFilteredLoyaltyCustomers] = useState([]);
  
  
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
    fetchLoyaltyCustomers();
    
  }, []);

  // Function to fetch table reservations data
  const fetchLoyaltyCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/loyaltycustomers");
      setLoyaltyCustomers(response.data);
      // Initially setting filteredReservations to all reservations
      setFilteredLoyaltyCustomers(response.data);
    } catch (error) {
      console.error("Error fetching table reservations:", error);
    }
  };




  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filtered data
    const filteredData = loyaltycustomers.filter((loyaltycustomer) => {
      return (
        loyaltycustomer.name.toLowerCase().includes(query.toLowerCase()) ||
        loyaltycustomer.email.toLowerCase().includes(query.toLowerCase())
        
      );
    });
    setFilteredLoyaltyCustomers(filteredData);
  };

  // Function to prepare data for PDF report
  const preparePDFData = () => {
    const title = "Loyalty Customer  Report";
    const columns = [ "Name", "Phone", "Email", "Membership type" ];
    const data = filteredLoyaltyCustomers.map(loyaltycutomer => ({
      
      "Name": loyaltycutomer.name,
      "Phone": loyaltycutomer.mobile,
      "Email": loyaltycutomer.email,
      "Membership type": loyaltycutomer.membershipType,
     
    }));
    const fileName = "LoyaltyCustomer_Report";
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
        Loyalty Customers
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
            placeholder="Search by loyalty customer name or Email"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {/* Table to display previous vip room reservations */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
          
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Membership Type</th>
           
          </tr>
        </thead>
        <tbody>
          {filteredLoyaltyCustomers.map((loyaltycustomers) => (
            <tr key={loyaltycustomers._id}>
              
              <td>{loyaltycustomers.name}</td>
              <td>{loyaltycustomers.mobile}</td>
              <td>{loyaltycustomers.email}</td>
              <td>{loyaltycustomers.membershipType}</td>
             
              
              
            </tr>
          ))}
        </tbody>
      </Table>

      
            
          
        
      
    </div>
  );
};

export default LoyaltyCustomers;