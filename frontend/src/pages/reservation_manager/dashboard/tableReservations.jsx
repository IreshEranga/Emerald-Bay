import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload } from "react-icons/io";


const TableReservations = () => {
  // Function to download PDF report
  const downloadPDF = () => {
    // Implement your PDF download logic here
    console.log("Downloading PDF report...");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{textAlign:"center"}}>Table Reservations</h1>

      <Link to="/table-reservations">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add Table Reservation</span>
        </Button>
      </Link>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>
    </div>
  );
};

export default TableReservations;