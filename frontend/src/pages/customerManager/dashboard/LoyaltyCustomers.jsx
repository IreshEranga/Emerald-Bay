import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdDownload } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from "axios";
import { generatePDF } from "../../../utils/GeneratePDF";
import Swal from 'sweetalert2';

const LoyaltyCustomers = () => {
  const [loyaltyCustomers, setLoyaltyCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLoyaltyCustomers, setFilteredLoyaltyCustomers] = useState([]);

  useEffect(() => {
    fetchLoyaltyCustomers();
  }, []);

  const fetchLoyaltyCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/loyaltycustomers");
      setLoyaltyCustomers(response.data);
      setFilteredLoyaltyCustomers(response.data);
    } catch (error) {
      console.error("Error fetching loyalty customers:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredData = loyaltyCustomers.filter((loyaltyCustomer) => {
      return (
        loyaltyCustomer.name.toLowerCase().includes(query.toLowerCase()) ||
        loyaltyCustomer.email.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredLoyaltyCustomers(filteredData);
  };

  const preparePDFData = () => {
    const currentDate = new Date();
    const title = `Loyalty Customer Report - ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const columns = ["Name", "Phone", "Email", "Membership Type", "Status"];
    const data = filteredLoyaltyCustomers.map(loyaltyCustomer => ({
        "Name": loyaltyCustomer.name,
        "Phone": loyaltyCustomer.mobile,
        "Email": loyaltyCustomer.email,
        "Membership Type": loyaltyCustomer.membershipType,
        "Status": loyaltyCustomer.status
    }));
    const fileName = "LoyaltyCustomer_Report";
    return { title, columns, data, fileName };
};

const downloadPDF = () => {
    const { title, columns, data, fileName } = preparePDFData();
    generatePDF(title, columns, data, fileName);
};


  const handleAcceptReject = async (id, shouldAccept) => {
    try {
      let message = shouldAccept ? 'Accept' : 'Reject';
      const result = await Swal.fire({
        title: `Are you sure you want to ${message}?`,
        text: "You will not be able to undo this operation!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${message} it!`
      });
  
      if (result.isConfirmed) {
        // Handle accept or reject action here
        if (shouldAccept) {
          await axios.put(`http://localhost:8000/loyaltycustomers/accept/${id}`);
          fetchLoyaltyCustomers();
          toast.success('Loyalty customer accepted and status updated to vip.');
        } else {
          await axios.delete(`http://localhost:8000/loyaltycustomers/reject/${id}`);
          fetchLoyaltyCustomers();
          toast.success('Loyalty customer request rejected and deleted.');
        }
      }
    } catch (error) {
      console.error('Error handling loyalty customer request:', error);
      toast.error('Error handling loyalty customer request.');
    }
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Loyalty Customers
      </h1>

      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

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

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Membership Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoyaltyCustomers.map((loyaltyCustomer) => (
            <tr key={loyaltyCustomer._id}>
              <td>{loyaltyCustomer.name}</td>
              <td>{loyaltyCustomer.mobile}</td>
              <td>{loyaltyCustomer.email}</td>
              <td>{loyaltyCustomer.membershipType}</td>
              <td>{loyaltyCustomer.status}</td>
              <td>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="success" 
                    onClick={() => handleAcceptReject(loyaltyCustomer._id, true)}
                  >
                    Accept
                  </Button>
  
                  <Button 
                    variant="danger" 
                    onClick={() => handleAcceptReject(loyaltyCustomer._id, false)}
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LoyaltyCustomers;
