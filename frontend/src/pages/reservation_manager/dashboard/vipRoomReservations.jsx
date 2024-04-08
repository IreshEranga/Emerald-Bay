import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import toast from 'react-hot-toast'; // Import toast function from react-hot-toast
import axios from "axios";


const VIPRoomReservations = () => {
  const [vipRoomReservations, setVIPRoomReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null); // State to hold reservation being edited
  const [availability, setAvailability] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAvailabilityMessage, setShowAvailabilityMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: '1', // Default value for number of guests
    date: getTodayDate(),
    time: ""
  });

  useEffect(() => {
    // Fetch vip room reservations data when component mounts
    fetchVIPRoomReservations();
    setAvailability(false); // Reset availability state on form change
  }, []);

  // Function to fetch vip room reservations data
  const fetchVIPRoomReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vipRoomReservation");
      setVIPRoomReservations(response.data);
      // Initially setting filteredReservations to all reservations
      setFilteredReservations(response.data);
    } catch (error) {
      console.error("Error fetching vip room reservations:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: name === "guests" ? parseInt(value) : value // Convert value to integer for guests
    }));
  };

  //function to get date
  function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }    

  //function to get time
  function generateTimeSlots() {
    const startTime = 10; // Start from 10:00 AM
    const endTime = 20; // End at 08:00 PM
    const slots = [];
    for (let i = startTime; i <= endTime; i += 2) {
        const hour = (i < 10) ? `0${i}` : `${i}`;
        slots.push(`${hour}:00`);
    }
    return slots;
  }

  //form validation
  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name.trim()) {
        errors.name = "Name is required";
    }
    if (!data.phone.trim()) {
        errors.phone = "Contact number is required";
    } else if (!/^\d{10}$/.test(data.phone.trim())) {
        errors.phone = "Invalid contact number";
    }
    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(data.email.trim())) {
        errors.email = "Invalid email address";
    }
    if (data.guests < 1 || data.guests > 50) {
        errors.guests = "Number of guests must be between 1 and 50";
    }
    return errors;
  };

  //function to check availability
  const handleCheckAvailability = async (e) => {
  e.preventDefault();
  setShowAvailabilityMessage(false);
  setLoading(true);
  const errorsObj = validateForm(formData);
  if (Object.keys(errorsObj).length === 0) {
      try {
          const response = await axios.post('http://localhost:8000/vipRoomReservation/checkAvailability', {
              ...formData,
              excludeReservationId: editReservation ? editReservation._id : null
          });
          console.log(response.data); // Assuming the backend responds with data
          setAvailability(response.data.available);
          setShowAvailabilityMessage(!response.data.available); // Show message only if not available
      } catch (error) {
          console.error('Error checking availability:', error);
          // Handle error state or display an error message
      } finally {
          setLoading(false);
      }
  } else {
      setErrors(errorsObj);
  }
  };

  // Function to handle edit
  const handleEdit = (reservation) => {
  setEditReservation(reservation);
  setFormData({
    name: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    guests: reservation.guests,
    date: reservation.date,
    time: reservation.time
  });
  };

  // Function to handle form submission (for update)
  const handleSubmit = async (event) => {
  event.preventDefault();
  if (editReservation) {
    // Update reservation
    try {
      // Update the editReservation state with new data
      const updatedReservation = {
        ...editReservation,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        guests: formData.guests,
        date: formData.date,
        time: formData.time
      };
      
      await axios.put(`http://localhost:8000/vipRoomReservation/update/${editReservation._id}`, updatedReservation);
      toast.success('Reservation updated successfully!'); // Display success toast
      setEditReservation(null); // Reset editReservation state
      fetchVIPRoomReservations(); // Refresh data after update
    } catch (error) {
      console.error("Error updating vip room reservation:", error);
    }
  } else {
    // Logic for creating a new reservation
  }
  };


  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/vipRoomReservation/delete/${id}`);
      fetchVIPRoomReservations(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting table reservation:", error);
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = vipRoomReservations.filter((reservation) => {
      return (
        reservation.name.toLowerCase().includes(query.toLowerCase()) ||
        reservation.reservationId.toLowerCase().includes(query.toLowerCase()) ||
        reservation.date.includes(query)
      );
    });
    setFilteredReservations(filteredData);
  };
  
  // Function to download PDF report
  const downloadPDF = () => {
    // Implement your PDF download logic here
    console.log("Downloading PDF report...");
  };

  return (
    <div className="container mt-5">    
      <h1 className="mb-5" style={{textAlign:"center"}}>VIP Room Reservations</h1>

      {/* Add reservation */}
      <Link to="/vip-room-reservations">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add VIP Room Reservation</span>
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
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr align='center'>
            <th>Res. ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.reservationId}</td>
              <td>{reservation.name}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.email}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td style={{display:'flex'}}>
                {/* Edit button */}
                <Button variant="info" className="mr-2" onClick={() => handleEdit(reservation)} style={{marginRight:'10px', marginLeft:'20px'}}>
                  <IoMdCreate />
                </Button>
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDelete(reservation._id)} style={{marginRight:'20px'}}>
                  <IoMdTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Reservation Form (to display when editing) */}
      {editReservation && (
        <div className="mt-4"><br></br>
          <h2 align="center" style={{color:'green'}}>Edit Reservation</h2>
          <div style={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={handleCheckAvailability} style={{width:'500px'}}>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Contact Number :</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Number of Guests :</label>
                        <input type="number" name="guests" value={formData.guests} onChange={handleChange} min={1} max={20} required />
                        {errors.guests && <span className="error">{errors.guests}</span>}
                    </div>
                    <div className="form-group">
                        <label>Date :</label>
                        <input type="date" name="date" value={formData.date} min={getTodayDate()} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Time :</label>
                        <select name="time" value={formData.time} onChange={handleChange} required>
                            <option value="">Select Time</option>
                            {generateTimeSlots().map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <p style={{ color: 'green' }}>One reservation is only available for two hours.</p>
                    </div>
                    <button className='btn' type="submit" style={{ width: '200px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '160px' }}>{loading ? 'Checking...' : 'Check Availability'}</button>
                    {availability &&
                    <button className='btn' onClick={handleSubmit} style={{ width: '200px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '160px'}}>Update Reservation</button>
                    }
                    {showAvailabilityMessage && !loading &&
                      <p style={{ color: 'red' }}>This reservation is not available. Please select a different date/time.</p>
                    }
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default VIPRoomReservations;