import React, { useState, useEffect } from 'react';
import './TableReservations.css';
import TableSeatsReservation from '../../assets/restaurant seat reservation.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';


const TableReservations = () => {
    const [errors, setErrors] = useState({});
    const [availability, setAvailability] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAvailabilityMessage, setShowAvailabilityMessage] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        tableNo: '',
        date: getTodayDate(),
        time: ''
    });
    
    useEffect(() => {
        setAvailability(false); // Reset availability state on form change
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
        const startTime = 8; // Start from 08:00 AM
        const endTime = 21; // End at 09:00 PM
        const slots = [];
        for (let i = startTime; i <= endTime; i += 1) {
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
                // Handle error state or display an error message
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(errorsObj);
        }
    };

    // Function to handle form submission (for create)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsObj = validateForm(formData);
        if (Object.keys(errorsObj).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/tableReservation/create', formData);
                console.log(response.data); // Assuming the backend responds with data
                /*resetForm();*/
                toast.success('Table booked successfully!'); // Display success toast
                setTimeout(() => {
                    window.history.back(); // Go back after a delay
                }, 1000); // Adjust the delay time as needed
            } catch (error) {
                console.error('Error submitting reservation:', error);
                // Handle error state or display an error message
                toast.error('Error booking table. Please try again later.');
            }
        } else {
            setErrors(errorsObj);
        }
    };

    /*const resetForm = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            tableNo: '',
            date: getTodayDate(),
            time: ''
        });
        setAvailability(false);
        setErrors({});
    };*/

    return (
        <div className="outer-container1"><br></br>
            <div className="table-reservation">
                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => window.history.back()} />
                <h2 className="center-heading">Reserve A Table</h2>
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
                        <label>Date :</label>
                        <input type="date" name="date" value={formData.date} min={getTodayDate()} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Time : </label>
                        <select name="time" value={formData.time} onChange={handleChange} required>
                            <option value=""> Select Time </option>
                            {generateTimeSlots().map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <p style={{ color: 'green' }}>One reservation is only available for one hour.</p>
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
                    <button className='btn' type="submit" style={{ width: '250px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '55px' }}>{loading ? 'Checking...' : 'Check Availability'}</button>
                    {availability &&
                    <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Book Table</button>
                    }
                    {showAvailabilityMessage && !loading &&
                        <p style={{ color: 'red' }}>This table is not available. Please select another table or try a different date/time.</p>
                     }
                </form>        
            </div><br></br>
        </div>
    );
};

export default TableReservations;