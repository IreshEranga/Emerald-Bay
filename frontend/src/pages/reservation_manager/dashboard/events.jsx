import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form, Modal  } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { generatePDF } from "../../../utils/GeneratePDF";
import toast from 'react-hot-toast';
import axios from "axios";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [showAvailabilityMessage, setShowAvailabilityMessage] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [startTimeOptions, setStartTimeOptions] = useState([]);
  const [endTimeOptions, setEndTimeOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: '1',
    date: getTodayDate(),
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    // Fetch events data when component mounts
    fetchEvents();
    setAvailability(false); // Reset availability state on form change
    // Update start time options when date changes
    updateStartTimeOptions(formData.date);
  }, [formData.date]);

  useEffect(() => {
    // Update end time options when start time changes
    updateEndTimeOptions(formData.startTime);
  }, [formData.startTime]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: name === "guests" ? parseInt(value) : value // Convert value to integer for guests
    }));
  };

  // Function to handle closing the form
  const handleCloseForm = () => {
    setEditReservation(null); // Reset editReservation state
  };

  //Function to group reservations by date
  const groupReservationsByDate = () => {
    const groupedReservations = {};
    filteredReservations.forEach(reservation => {
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

    // Function to update start time options dynamically based on selected date
    const updateStartTimeOptions = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    const hours = today.getHours();
    const minutes = today.getMinutes();
    let startTimeOptions = [];

    // Function to determine if a time is within the range of 8:00 AM to 10:00 PM
    const isWithinRange = (hour, minute) => {
        const time = hour + minute / 60;
        return time >= 8 && time <= 19;
    };

    // If the selected date is today, consider only times after the current time
    if (selected.toDateString() === today.toDateString()) {
        let startHour = hours;
        let startMinute = Math.ceil(minutes / 30) * 30; // Round minutes up to the nearest 30
        if (startMinute === 60) {
            startMinute = 0;
            startHour += 1;
        }

        for (let hour = startHour; hour <= 19; hour++) {
            for (let minute = (hour === startHour ? startMinute : 0); minute < 60; minute += 30) {
                if (isWithinRange(hour, minute)) {
                    const formattedHour = String(hour).padStart(2, '0');
                    const formattedMinute = String(minute).padStart(2, '0');
                    const time = `${formattedHour}.${formattedMinute}`;
                    startTimeOptions.push(time);
                }
            }
        }
    } else {
        // For other dates, consider all times from 8:00 AM to 10:00 PM
        for (let hour = 8; hour <= 19; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = String(hour).padStart(2, '0');
                const formattedMinute = String(minute).padStart(2, '0');
                const time = `${formattedHour}.${formattedMinute}`;
                startTimeOptions.push(time);
            }
        }
    }
    setFormData(prevState => ({
        ...prevState,
        startTime: '', // Reset start time when options change
    }));
    setStartTimeOptions(startTimeOptions);
  };

  // Function to update end time options based on selected start time
  const updateEndTimeOptions = (selectedStartTime) => {
    if (!selectedStartTime) return; // If no start time selected, return empty end time options

    const [startHour, startMinute] = selectedStartTime.split('.').map(Number);
    let endTimeOptions = [];

    // Generate end times starting from 30 minutes after the selected start time
    let minuteOffset = startMinute + 30;
    for (let hour = startHour; hour <= 19; hour++) {
        for (let minute = minuteOffset; minute < 60; minute += 30) {
            const formattedHour = String(hour).padStart(2, '0');
            const formattedMinute = String(minute).padStart(2, '0');
            const time = `${formattedHour}.${formattedMinute}`;
            endTimeOptions.push(time);
        }
        minuteOffset = 0; // After the first hour, start from 0 minutes
    }

    setFormData((prevState) => ({
        ...prevState,
        endTime: '', // Reset end time when options change
    }));
    setEndTimeOptions(endTimeOptions);
  };    

  // Handler for start time change
  const handleStartTimeChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        startTime: value
    }));
  };

  // Handler for end time change
  const handleEndTimeChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        endTime: value
    }));
  };

  // Update handleCheckAvailability function to include startTime and endTime in formData
  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    setShowAvailabilityMessage(false);
    setLoading(true);
    const errorsObj = validateForm(formData);
    if (Object.keys(errorsObj).length === 0) {
        try {
            const response = await axios.post('http://localhost:8000/event/checkAvailability', formData);
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
      startTime: reservation.startTime,
      endTime: reservation.endTime
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
          startTime: formData.startTime,
          endTime: formData.endTime
        };
        
        await axios.put(`http://localhost:8000/event/update/${editReservation._id}`, updatedReservation);
        toast.success('Reservation updated successfully!'); // Display success toast
        setEditReservation(null); // Reset editReservation state
        fetchEvents(); // Refresh data after update
      } catch (error) {
        console.error("Error updating event:", error);
        toast.error('Error updating reservation!');
      }
    } else {
      // Logic for creating a new reservation
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/event/delete/${id}`);
      fetchEvents(); // Refresh data after deletion
      toast.success('Reservation deleted successfully!');
    } catch (error) {
      console.error("Error deleting event:", error);
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
    const filteredData = events.filter((reservation) => {
      return (
        reservation.name.toLowerCase().includes(query.toLowerCase()) ||
        reservation.email.toLowerCase().includes(query.toLowerCase()) ||
        reservation.reservationId.toLowerCase().includes(query.toLowerCase()) ||
        reservation.date.includes(query)
      );
    });
    setFilteredReservations(filteredData);
  };

  // Function to prepare data for PDF report
  const preparePDFData = (reservations) => {
    const title = "Events Report";
    const columns = ["Res. ID", "Name", "Phone", "Email", "No. of Guests", "Date", "Start Time", "End Time"];
    const data = reservations.map(reservation => ({
      "Res. ID": reservation.reservationId,
      "Name": reservation.name,
      "Phone": reservation.phone,
      "Email": reservation.email,
      "No. of Guests": reservation.guests,
      "Date": reservation.date.split('T')[0],
      "Start Time": reservation.startTime,
      "End Time": reservation.endTime
    }));
    const fileName = "events_report";
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
    switch (timePeriod) {
      case 'today':
        filteredData = events.filter(reservation => reservation.date === getTodayDate());
        break;
      case 'past7days':
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
        filteredData = events.filter(reservation => reservation.date >= sevenDaysAgoStr);
        break;
      case 'pastMonth':
        const pastMonth = new Date();
        pastMonth.setMonth(pastMonth.getMonth() - 1);
        const pastMonthStr = pastMonth.toISOString().split('T')[0];
        filteredData = events.filter(reservation => reservation.date >= pastMonthStr);
        break;
      case 'past3Months':
        const past3Months = new Date();
        past3Months.setMonth(past3Months.getMonth() - 3);
        const past3MonthsStr = past3Months.toISOString().split('T')[0];
        filteredData = events.filter(reservation => reservation.date >= past3MonthsStr);
        break;
      default:
        filteredData = events;
    }
    downloadPDF(filteredData);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{textAlign:"center"}}>Events</h1>

      <div style={{ display: 'flex', gap:'10px', alignItems:'center'}}>
      {/* Add reservation */}
      <Link to="/events">
        <Button variant="primary" className="m-1">
          <IoMdAddCircleOutline className="mb-1" /> <span>Add Event</span>
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
            style={{ width: "400px", border: '1px solid gray', padding: '20px', borderRadius: '30px', position:'relative', marginLeft:'180px', zIndex:'1', height:'20px', marginRight:'0px'}}
          />
        </Form.Group>
      </Form>
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
                <th>Guests</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
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
                  <td>{reservation.guests}</td>
                  <td>{reservation.date.split('T')[0]}</td>
                  <td>{reservation.startTime}</td>
                  <td>{reservation.endTime}</td>
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
        <div className="outer-container3"><br></br>
          <div className="events">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={handleCloseForm} />
          <h2 className="center-heading">Edit reservation</h2>
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
                    <label>Number of Guests :</label>
                    <input type="number" name="guests" value={formData.guests} onChange={handleChange} min={1} max={50} required />
                    {errors.guests && <span className="error">{errors.guests}</span>}
                </div>
                <div className="form-group">
                    <label>Date :</label>
                    <input type="date" name="date" value={formData.date} min={getTodayDate()} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Start Time :</label>
                    <select name="startTime" value={formData.startTime} onChange={handleStartTimeChange} required>
                        <option value="">Select Time</option>
                        {startTimeOptions.map(time => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>End Time :</label>
                    <select name="endTime" value={formData.endTime} onChange={handleEndTimeChange} required>
                    <option value="">Select Time</option>
                        {endTimeOptions.map(time => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='btn' type="submit" style={{ width: '250px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '55px' }}>{loading ? 'Checking...' : 'Check Availability'}</button>
                {availability &&
                <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Update reservation</button>
                }
                {showAvailabilityMessage && !loading &&
                    <p style={{ color: 'red' }}>This reservation is not available. Please select a different date/time.</p>
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

export default Events;