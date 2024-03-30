import React, { useState } from 'react';
import './VIPRoomReservations.css';


const VIPRoomReservations = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsObj = validateForm(formData);
        if (Object.keys(errorsObj).length === 0) {
            // Submit the form if there are no errors
            console.log(formData);
            // You can add your submission logic here, like sending the data to a server
        } else {
            setErrors(errorsObj);
        }
    };

    const validateForm = (data) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.name.trim()) {
            errors.name = "Name is required";
        }
        if (!data.contactNumber.trim()) {
            errors.contactNumber = "Contact number is required";
        } else if (!/^\d{10}$/.test(data.contactNumber.trim())) {
            errors.contactNumber = "Invalid contact number";
        }
        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(data.email.trim())) {
            errors.email = "Invalid email address";
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
        const startTime = 10; // Start from 10:00 AM
        const endTime = 20; // End at 8:00 PM
        const slots = [];
        for (let i = startTime; i <= endTime; i += 2) {
            const hour = (i < 10) ? `0${i}` : `${i}`;
            slots.push(`${hour}:00`);
        }
        return slots;
    }

    return (
        <div className="vip-room-reservation">
            <h2 className="center-heading">Reserve VIP Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                    {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} min={getTodayDate()} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <select name="time" value={formData.time} onChange={handleChange} required>
                        <option value="">Select Time</option>
                        {generateTimeSlots().map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                    <p style={{ color: 'green' }}>One reservation is only available for two hours.</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default VIPRoomReservations;