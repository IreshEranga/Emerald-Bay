import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload } from "react-icons/io";
import axios from "axios";


const VIPRoomReservations = () => {
  const [vipRoomReservations, setVIPRoomReservations] = useState([]);

  useEffect(() => {
    // Fetch vip room reservations data when component mounts
    fetchVIPRoomReservations();
  }, []);

  // Function to fetch table reservations data
  const fetchVIPRoomReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vipRoomReservation");
      setVIPRoomReservations(response.data);
    } catch (error) {
      console.error("Error fetching vip room reservations:", error);
    }
  };

  // Function to download PDF report
  const downloadPDF = () => {
    // Implement your PDF download logic here
    console.log("Downloading PDF report...");
  };

  return (
    <div className="container mt-5">
      
      <h1 className="mb-5" style={{textAlign:"center"}}>VIP Room Reservations</h1>

      <Link to="/vip-room-reservations">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add VIP Room Reservation</span>
        </Button>
      </Link>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      {/* Table to display previous vip room reservations */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Res. ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {vipRoomReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{reservation.name}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.email}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default VIPRoomReservations;