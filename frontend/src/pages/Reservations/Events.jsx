import React, { useState, useEffect } from 'react';
import './Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';


const Events = () => {
    const [errors, setErrors] = useState({});
    const [availability, setAvailability] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAvailabilityMessage, setShowAvailabilityMessage] = useState(false);
    const [startTimeOptions, setStartTimeOptions] = useState([]);
    const [endTimeOptions, setEndTimeOptions] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        guests: '1',
        date: getTodayDate(),
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        setAvailability(false); // Reset availability state on form change
        // Update start time options when date changes
        updateStartTimeOptions(formData.date);
    }, [formData.date]);

    useEffect(() => {
        // Update end time options when start time changes
        updateEndTimeOptions(formData.startTime);
    }, [formData.startTime]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "guests" ? parseInt(value) : value // Convert value to integer for guests
        }));
    };

    // Function to get today's date
    function getTodayDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();

        return `${year}-${month}-${day}`;
    }

    // Form validation function
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
                const response = await axios.post('http://localhost:8000/event/create', formData);
                console.log(response.data); // Assuming the backend responds with data
                /*resetForm();*/
                toast.success('Event reserved successfully!');
                setTimeout(() => {
                    window.history.back(); // Go back after a delay
                }, 1000); // Adjust the delay time as needed
            } catch (error) {
                console.error('Error submitting reservation:', error);
                toast.error('Error booking event. Please try again later.');
            }
        } else {
            setErrors(errorsObj);
        }
    };

    return (
        <div className="outer-container3"><br></br>
            <div className="events">
                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => window.history.back()} />
                <h2 className="center-heading">Plan An Event</h2>
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
                    <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Book Event</button>
                    }
                    {showAvailabilityMessage && !loading &&
                        <p style={{ color: 'red' }}>This reservation is not available. Please select a different date/time.</p>
                    }
                </form>
            </div><br></br>
        </div>
    );
};

export default Events;