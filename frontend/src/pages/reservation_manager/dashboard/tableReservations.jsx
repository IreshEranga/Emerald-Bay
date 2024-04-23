import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TableSeatsReservation from '../../../assets/restaurant seat reservation.png';
import { generatePDF } from "../../../utils/GeneratePDF";
import toast from 'react-hot-toast';
import axios from "axios";


const TableReservations = () => {
  const [tableReservations, setTableReservations] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [showAvailabilityMessage, setShowAvailabilityMessage] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tableNo: "",
    date: getTodayDate(),
    time: ""
  });

  useEffect(() => {
    // Fetch table reservations data when component mounts
    fetchTableReservations();
    setAvailability(false); // Reset availability state on form change
  }, []);

  useEffect(() => {
    // Update time slots based on selected date
    setAvailableTimeSlots(generateTimeSlots(formData.date));
  }, [formData.date]);

  // Function to fetch table reservations data
  const fetchTableReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tableReservation");
      setTableReservations(response.data);
      // Initially setting filteredReservations to all reservations
      setFilteredReservations(response.data);
    } catch (error) {
      console.error("Error fetching table reservations:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
  };

  // Function to handle closing the form
  const handleCloseForm = () => {
    setEditReservation(null); // Reset editReservation state
  };

  //Function to group reservations by date and sort them in descending order
  const groupReservationsByDate = () => {
    // Sort reservations by date in descending order
    const sortedReservations = filteredReservations.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const groupedReservations = {};
    sortedReservations.forEach(reservation => {
      const date = reservation.date;
      if (!groupedReservations[date]) {
        groupedReservations[date] = [];
      }
      groupedReservations[date].push(reservation);
    });
    return groupedReservations;
  };

  //function to get date
  function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const generateTimeSlots = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    const isToday = today.toDateString() === selected.toDateString();
    const startTime = isToday ? today.getHours() : 8; // Start from current hour if date is today
    const endTime = 22; // End at 09:00 PM
    const slots = [];
    for (let i = startTime; i <= endTime; i++) {
        for (let j = 0; j < 60; j += 30) { // Increment by 30 minutes
            const hour = (i < 10) ? `0${i}` : `${i}`;
            const minute = (j === 0) ? '00' : '30';
            slots.push(`${hour}:${minute}`);
        }
    }
    return slots;
  };

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
    if (!data.tableNo) {
      errors.tableNo = "Table number is required";
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
        const response = await axios.post('http://localhost:8000/tableReservation/checkAvailability', formData);
        console.log(response.data); // Assuming the backend responds with data
        setAvailability(response.data.available);
        setShowAvailabilityMessage(!response.data.available); // Show message only if not available
      } catch (error) {
        console.error('Error checking availability:', error);
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
      tableNo: reservation.tableNo,
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
        const updatedReservation = {
          ...editReservation,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          tableNo: formData.tableNo,
          date: formData.date,
          time: formData.time
        };
        
        await axios.put(`http://localhost:8000/tableReservation/update/${editReservation._id}`, updatedReservation);
        toast.success('Reservation updated successfully!');
        setEditReservation(null); // Reset editReservation state
        fetchTableReservations(); // Refresh data after update
      } catch (error) {
        console.error("Error updating table reservation:", error);
        toast.error('Error updating reservation!');
      }
    } else {
      setErrors(errorsObj);
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tableReservation/delete/${id}`);
      fetchTableReservations();
      toast.success('Reservation deleted successfully!');
    } catch (error) {
      console.error("Error deleting table reservation:", error);
      toast.error('Error deleting reservation!');
    }
  };
 
  // Function to handle opening confirmation modal
  const handleOpenConfirmationModal = (id) => {
    setReservationToDelete(id);
    setShowConfirmationModal(true);
  };

  // Function to handle closing confirmation modal
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setReservationToDelete(null);
  };

  // Function to handle confirmed deletion
  const handleConfirmDeletion = () => {
    handleDelete(reservationToDelete);
    setShowConfirmationModal(false);
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filtered data
    const filteredData = tableReservations.filter((reservation) => {
      return (
        reservation.name.toLowerCase().includes(query.toLowerCase()) ||
        reservation.email.toLowerCase().includes(query.toLowerCase()) ||
        reservation.reservationId.toLowerCase().includes(query.toLowerCase()) ||
        reservation.date.includes(query)
      );
    });
    setFilteredReservations(filteredData);
  };

  // Function to handle download reports based on search results
  const handleSearchDownloadReportsClick = () => {
    // Filter data based on search query
    const filteredData = tableReservations.filter((reservation) => {
      return (
        reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.reservationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.date.includes(searchQuery)
      );
    });
    const searchResults = filteredData;
    generatePDF(
      `Search Results for Table Reservation: ${searchQuery}`,
      ["Res. ID", "Name", "Phone", "Email", "Table No", "Date", "Time"],
      searchResults.flatMap(reservation => [
        { "Date": reservation.date, "Res. ID": reservation.reservationId, "Email": reservation.email, "Name": reservation.name, "Phone": reservation.phone, "Table No": reservation.tableNo, "Time": reservation.time  }
      ]),
      `Table Reservation_${searchQuery}`,
    );
  };

  // Function to prepare data for PDF report
  const preparePDFData = (reservations) => {
    const title = "Table Reservations Report";
    const columns = ["Res. ID", "Name", "Phone", "Email", "Table No", "Date", "Time"];
    const data = reservations.map(reservation => ({
      "Res. ID": reservation.reservationId,
      "Name": reservation.name,
      "Phone": reservation.phone,
      "Email": reservation.email,
      "Table No": reservation.tableNo,
      "Date": reservation.date.split('T')[0],
      "Time": reservation.time
    }));
    const fileName = "table_reservations_report";
    return { title, columns, data, fileName };
  };

  // Function to handle downloading PDF report
  const downloadPDF = (reservations) => {
    const { title, columns, data, fileName } = preparePDFData(reservations);
    generatePDF(title, columns, data, fileName);
  };

  //Function to handle download reports button
  const handleDownloadReportsClick = () => {
    setShowAdditionalButtons(!showAdditionalButtons);
  };

  // Function to handle downloading PDF reports for different time periods
  const handleDownloadReport = (timePeriod) => {
  let filteredData = [];
  const today = new Date();
  switch (timePeriod) {
    case 'today':
      filteredData = tableReservations.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return (
          reservationDate.getDate() === today.getDate() &&
          reservationDate.getMonth() === today.getMonth() &&
          reservationDate.getFullYear() === today.getFullYear()
        );
      });
      break;
    case 'past7days':
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      filteredData = tableReservations.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservationDate >= sevenDaysAgo && reservationDate <= today;
      });
      break;
    case 'pastMonth':
      const pastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      filteredData = tableReservations.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return (
          reservationDate >= pastMonth && 
          (reservationDate.getDate() <= today.getDate() || reservationDate.getMonth() < today.getMonth())
        );
      });
      break;
    case 'past3Months':
      const past3Months = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      filteredData = tableReservations.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return (
          reservationDate >= past3Months && 
          (reservationDate.getDate() <= today.getDate() || reservationDate.getMonth() < today.getMonth())
        );
      });
      break;
    default:
      filteredData = tableReservations;
    }
    downloadPDF(filteredData);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Table Reservations
      </h1>

      <div style={{ display: 'flex', gap:'10px', alignItems: 'center' }}>
      {/* Add reservation */}
      <Link to="/table-reservations">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add Table Reservation</span>
        </Button>
      </Link>

      {/* Initial Download Reports Button */}
      <Button
        className="btn-danger"
        onClick={handleDownloadReportsClick}
      >
        <IoMdDownload className="mb-1" /> <span>Download Reports</span>
      </Button>

      {/* Search Form */}
      <Form className="mb-1">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by reservation ID or Name or Email or Date"
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: "400px", border: '1px solid gray', padding: '20px', borderRadius: '30px', position:'relative', marginLeft:'50px', zIndex:'1', height:'20px', marginRight:'0px'}}
          />
        </Form.Group>
      </Form>
      <Button
        className="btn-success"
        onClick={handleSearchDownloadReportsClick}
      >
        <IoMdDownload className="mb-1" />
      </Button>
      </div>

      {/* Additional Download Buttons */}
      {showAdditionalButtons && (
        <div style={{ display: 'flex', gap:'10px', alignItems: 'center' }}>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("all")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>All Reservations</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("today")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Today's Reservations</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("past7days")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Past 7 Days Reservations</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("pastMonth")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Past Month Reservations</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("past3Months")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Past 3 Months Reservations</span>
          </Button>
        </div>
      )}

      {/* Grouped reservations */}
      {Object.entries(groupReservationsByDate()).map(([date, reservations]) => (
        <div key={date}>
          <h2 className="mt-4" style={{backgroundColor:'wheat', width:'155px', padding:'8px', borderRadius:'40px', paddingLeft:'22px', fontSize:'22px'}}>{date.split('T')[0]}</h2>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr align='center'>
                <th>Res. ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Table No</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.tableNo}</td>
                  <td>{reservation.date.split('T')[0]}</td>
                  <td>{reservation.time}</td>
                  <td style={{display:'flex'}}>
                    {/* Edit button */}
                    <Button variant="info" className="mr-2" onClick={() => handleEdit(reservation)} style={{marginRight:'10px', marginLeft:'15px'}}>
                      <IoMdCreate />
                    </Button>
                    {/* Delete button */}
                    <Button variant="danger" onClick={() => handleOpenConfirmationModal(reservation._id)} style={{marginRight:'15px'}}>
                      <IoMdTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      {/* Reservation Form (to display when editing) */}
      {editReservation && (
        <div className="outer-container1"><br></br>
          <div className="table-reservation">
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={handleCloseForm} />               
            <h2 className="center-heading">Edit Reservation</h2>
            <img src={TableSeatsReservation} style={{ width: '360px', alignContent: 'center' }} alt="TableSeatsReservation" /><br /><br />
            <form onSubmit={handleCheckAvailability}>
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
                    <label>Table Number : </label>
                    <select name="tableNo" value={formData.tableNo} onChange={handleChange} required>
                        <option value=""> Select Table No </option>
                        {[...Array(13).keys()].map(num => (
                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                    </select>
                    {errors.tableNo && <span className="error">{errors.tableNo}</span>}
                    <p style={{ color: 'green' }}>Please select a table using table layout.</p>
                </div>
                <div className="form-group">
                    <label>Date :</label>
                    <input type="date" name="date" value={formData.date} min={getTodayDate()} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Time : </label>
                    <select name="time" value={formData.time} onChange={handleChange} required>
                        <option value=""> Select Time </option>
                        {availableTimeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                    <p style={{ color: 'green' }}>One reservation is only available for 30 minutes.</p>
                </div>
                <button className='btn' type="submit" style={{ width: '250px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '55px' }}>{loading ? 'Checking...' : 'Check Availability'}</button>
                {availability &&
                <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Update Reservation</button>
                }
                {showAvailabilityMessage && !loading &&
                    <p style={{ color: 'red' }}>This table is not available. Please select another table or try a different date/time.</p>
                 }
            </form>        
          </div><br></br>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this reservation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDeletion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableReservations;