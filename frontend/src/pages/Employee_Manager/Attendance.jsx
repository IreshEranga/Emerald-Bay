import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCreate, IoMdTrash } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { generatePDF } from "../../utils/GeneratePDF";
import toast from 'react-hot-toast';
import axios from "axios";


const Attendance = () => {
  const [attendance, setAttendance] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [formData, setFormData] = useState({
    EmpID:"",
    name: "",
    email: "",
    role: "",
    date: getTodayDate(),
    time: ""
  });

  useEffect(() => {
   
    fetchAttendance();

  }, []);

  useEffect(() => {
    // Update time slots based on selected date
    setAvailableTimeSlots(generateTimeSlots(formData.date));
  }, [formData.date]);

  // Function to fetch attendance data
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:8000/attendance");
      setAttendance(response.data);
      // Initially setting filteredattendance
      setFilteredAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
  };

  

  //Function to group attendance by date and sort them in descending order
  const groupAttendanceByDate = () => {
    // Sort attendance by date in descending order
    const sortedAttendance = filteredAttendance.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const groupedAttendance = {};
    sortedAttendance.forEach(attendance => {
      const date = attendance.date;
      if (!groupedAttendance[date]) {
        groupedAttendance[date] = [];
      }
      groupedAttendance[date].push(attendance);
    });
    return groupedAttendance;
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

    if (!data.EmpID.trim()) {
        errors.EmpID = "Employee ID is required";
    }
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = "Invalid email address";
    }
    if (!data.role) {
        errors.role = "Role is required";
    }
    return errors;
  };

 

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filtered data
    const filteredData = attendance.filter((attendance) => {
      return (
        attendance.name.toLowerCase().includes(query.toLowerCase()) ||
        attendance.email.toLowerCase().includes(query.toLowerCase()) ||
        attendance.EmpID.toLowerCase().includes(query.toLowerCase()) ||
        attendance.date.includes(query)
      );
    });
    setFilteredAttendance(filteredData);
  };

  // Function to handle download reports based on search results
  const handleSearchDownloadReportsClick = () => {
    // Filter data based on search query
    const filteredData = attendance.filter((attendance) => {
      return (
        attendance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.date.includes(searchQuery)
      );
    });
    const searchResults = filteredData;
    generatePDF(
      `Search Results for Table Reservation: ${searchQuery}`,
      ["Emp ID", "Name", "Role", "Email", "Date", "Time"],
      searchResults.flatMap(attendance => [
        { "Date": attendance.date, "Emp ID": attendance.EmpID, "Email": attendance.email, "Name": attendance.name, "Role": attendance.role,  "Time": attendance.time  }
      ]),
      `Attendance_${searchQuery}`,
    );
  };

  // Function to prepare data for PDF report
  const preparePDFData = (attendance) => {
    const title = "Attendance Report";
    const columns = ["Emp. ID", "Name", "Role", "Email",  "Date", "Time"];
    const data = attendance.map(attendance => ({
      "Emp ID": attendance.EmpID,
      "Name": attendance.name,
      "Role": attendance.role,
      "Email": attendance.email,
      "Date": attendance.date.split('T')[0],
      "Time": attendance.time
    }));
    const fileName = "attendance_report";
    return { title, columns, data, fileName };
  };

  // Function to handle downloading PDF report
  const downloadPDF = (attendance) => {
    const { title, columns, data, fileName } = preparePDFData(attendance);
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
      filteredData = attendance.filter(attendance => {
        const attendanceDate = new Date(attendance.date);
        return (
          attendanceDate.getDate() === today.getDate() &&
          attendanceDate.getMonth() === today.getMonth() &&
          attendanceDate.getFullYear() === today.getFullYear()
        );
      });
      break;
    case 'past7days':
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      filteredData = attendance.filter(attendance => {
        const attendanceDate = new Date(attendance.date);
        return attendanceDate >= sevenDaysAgo && attendanceDate <= today;
      });
      break;
    case 'pastMonth':
      const pastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      filteredData = attendance.filter(attendance => {
        const attendanceDate = new Date(attendance.date);
        return (
            attendanceDate >= pastMonth && 
          (attendanceDate.getDate() <= today.getDate() || attendanceDate.getMonth() < today.getMonth())
        );
      });
      break;
    case 'past3Months':
      const past3Months = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      filteredData = attendance.filter(attendance => {
        const attendanceDate = new Date(attendance.date);
        return (
            attendanceDate >= past3Months && 
          (attendanceDate.getDate() <= today.getDate() || attendanceDate.getMonth() < today.getMonth())
        );
      });
      break;
    default:
      filteredData = attendance;
    }
    downloadPDF(filteredData);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Attendance
      </h1>

      <div style={{ display: 'flex', gap:'10px', alignItems: 'center' }}>
     
      

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
            placeholder="Search by employee ID or Name or Email or Date"
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
            <span>All Attendees</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("today")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Today's Attendance</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("past7days")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Past 7 Days Attendees</span>
          </Button>
          <Button
            variant="success"
            className="m-1"
            onClick={() => handleDownloadReport("pastMonth")}
          >
            <IoMdDownload className="mb-1" />{" "}
            <span>Past Month Attendees</span>
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

      {/* Grouped attendance */}
      {Object.entries(groupAttendanceByDate()).map(([date, attendance]) => (
        <div key={date}>
          <h2 className="mt-4" style={{backgroundColor:'wheat', width:'155px', padding:'8px', borderRadius:'40px', paddingLeft:'22px', fontSize:'22px'}}>{date.split('T')[0]}</h2>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr align='center'>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date</th>
                <th>Time</th>
                
              </tr>
            </thead>
            <tbody>
              {attendance.map((attendance) => (
                <tr key={attendance._id}>
                  <td>{attendance.EmpID}</td>
                  <td>{attendance.name}</td>
                  <td>{attendance.email}</td>
                  <td>{attendance.role}</td>
                  <td>{attendance.date.split('T')[0]}</td>
                  <td>{attendance.time}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

     
    </div>
  );
};

export default Attendance;