import React, { useState } from 'react';
import './Events.css';


const Events = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        date: getTodayDate(),
        time: '',
        guests: 1 // Default value for number of guests
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "guests" ? parseInt(value) : value // Convert value to integer for guests
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
        if (data.guests < 1 || data.guests > 20) {
            errors.guests = "Number of guests must be between 1 and 20";
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

    return (
        <div className="outer-container3"><br></br>
            <div className="events">
                <h2 className="center-heading">Plan An Event</h2><br></br>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Contact Number :</label>
                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
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
                        <label>Time :</label>
                        <input type="time" value={formData.time} onChange={handleChange} required/>
                    </div>
                    
                    <button className='btn' type="submit" style={{width: '250px', padding: '10px', backgroundColor:'#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'55px'}}>Submit</button>
                </form>
            </div><br></br>
        </div>
    );
};

export default Events;