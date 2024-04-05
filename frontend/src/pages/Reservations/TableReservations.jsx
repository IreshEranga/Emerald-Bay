import React, { useState } from 'react';
import './TableReservations.css';
import TableSeatsReservation from '../../assets/restaurant seat reservation.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const TableReservations = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        tableNo: '',
        date: getTodayDate(),
        time: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return `${year}-${month}-${day}`;
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsObj = validateForm(formData);
        if (Object.keys(errorsObj).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/tableReservation/create', formData);
                console.log(response.data); // Assuming the backend responds with data
                // Handle success or further actions here
                if (response.ok) {
                    console.log('Reservation submitted successfully');
                } else {
                    const errorData = await response.json();
                    console.error('Error submitting reservation:', errorData);
                } 
            } catch (error) {
                console.error('Error submitting reservation:', error);
                // Handle error state or display an error message
            }
        } else {
            setErrors(errorsObj);
        }
    };

    return (
        <div className="outer-container1">
            <div className="table-reservation">
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => window.history.back()} />
                <h2 className="center-heading">Reserve A Table</h2>               
                <img src={TableSeatsReservation} style={{width:'360px', alignContent:'center'}} alt="TableSeatsReservation" /><br /><br />
                <form onSubmit={handleSubmit}>
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
                            <option value=""> Select Table Number </option>
                            {[...Array(13).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                        {errors.tableNo && <span className="error">{errors.tableNo}</span>}
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
                    <button className='btn' type="submit" style={{width: '250px', padding: '10px', backgroundColor:'#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'55px'}}>Check Availability</button>
                </form>
            </div>
        </div>
    );
};

export default TableReservations;