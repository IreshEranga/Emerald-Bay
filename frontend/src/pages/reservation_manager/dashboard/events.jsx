import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null); // State to hold reservation being edited

  useEffect(() => {
    // Fetch events data when component mounts
    fetchEvents();
  }, []);

  // Function to fetch events data
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/event");
      setEvents(response.data);
      // Initially setting filteredReservations to all reservations
      setFilteredReservations(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = events.filter((reservation) => {
      return (
        reservation.name.toLowerCase().includes(query.toLowerCase()) ||
        reservation._id.toLowerCase().includes(query.toLowerCase()) ||
        reservation.date.includes(query)
      );
    });
    setFilteredReservations(filteredData);
  };

  // Function to handle edit
  const handleEdit = (reservation) => {
    setEditReservation(reservation); // Set the reservation being edited
  };

  // Function to handle form submission (for update or create)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editReservation) {
      // Update reservation
      try {
        await axios.put(`http://localhost:8000/event/update/${editReservation._id}`, editReservation);
        setEditReservation(null); // Reset editReservation state
        fetchEvents(); // Refresh data after update
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      // Create new reservation
      // Add your logic here for creating a new reservation
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/event/delete/${id}`);
      fetchEvent(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Function to download PDF report
  const downloadPDF = () => {
    // Implement your PDF download logic here
    console.log("Downloading PDF report...");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{textAlign:"center"}}>Events</h1>

      {/* Add reservation */}
      <Link to="/events">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add Event</span>
        </Button>
      </Link>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      {/* Search Form */}
      <Form className="mt-3">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by Reservation ID or Name or Date"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {/* Table to display previous vip room reservations */}
      <Table striped bordered hover className="mt-4" style={{align:'center'}}>
        <thead>
          <tr align='center'>
            <th>Res. ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th> {/* Added Action column */}
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{reservation.name}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.email}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td style={{display:'flex'}}>
                {/* Edit button */}
                <Button variant="info" className="mr-2" onClick={() => handleEdit(reservation)} style={{marginRight: '10px'}}>
                  <IoMdCreate />
                </Button>
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDelete(reservation._id)}>
                  <IoMdTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Reservation Form (to display when editing) */}
      {editReservation && (
        <div className="mt-4">
          <h2 align="center">Edit Reservation</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.name}
                onChange={(e) => setEditReservation({ ...editReservation, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.phone}
                onChange={(e) => setEditReservation({ ...editReservation, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editReservation.email}
                onChange={(e) => setEditReservation({ ...editReservation, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGuests">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="text"
                value={editReservation.guests}
                onChange={(e) => setEditReservation({ ...editReservation, guests: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editReservation.date}
                onChange={(e) => setEditReservation({ ...editReservation, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={editReservation.time}
                onChange={(e) => setEditReservation({ ...editReservation, time: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Reservation
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Events;