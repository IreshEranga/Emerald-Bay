import React, { useState, useEffect  } from 'react';
import './VIPRoomReservations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';


const VIPRoomReservations = () => {
    const [errors, setErrors] = useState({});
    const [availability, setAvailability] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAvailabilityMessage, setShowAvailabilityMessage] = useState(false);
    const [availableTimeSlots, setAvailableTimeSlots] = useState(generateTimeSlots(getTodayDate()));
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        guests: '1',
        date: getTodayDate(),
        time: '',
    });

    useEffect(() => {
        setAvailability(false); // Reset availability state on form change
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                time: '' // Reset time when date changes
            }));
            // Update time slots based on selected date
            setAvailableTimeSlots(generateTimeSlots(value));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: name === "guests" ? parseInt(value) : value // Convert value to integer for guests
            }));
        }
    };

    //function to get date
    function getTodayDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();
    
        return `${year}-${month}-${day}`;
    }      

    // Function to generate time slots based on selected date
    function generateTimeSlots(selectedDate) {
        const today = new Date();
        const selected = new Date(selectedDate);
        const startTime = (today.getDate() === selected.getDate()) ? today.getHours() : 8; // Start from current hour if date is today
        const endTime = 20; // End at 09:00 PM
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
                const response = await axios.post('http://localhost:8000/vipRoomReservation/checkAvailability', formData);
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
                const response = await axios.post('http://localhost:8000/vipRoomReservation/create', formData);
                console.log(response.data); // Assuming the backend responds with data
                /*resetForm();*/
                toast.success('VIP Room booked successfully!');
                setTimeout(() => {
                    window.history.back(); // Go back after a delay
                }, 1000); // Adjust the delay time as needed
            } catch (error) {
                console.error('Error submitting reservation:', error);
                toast.error('Error booking vip room. Please try again later.');
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
        <div className="outer-container2"><br></br>
            <div className="vip-room-reservation">
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => window.history.back()} />
                <h2 className="center-heading">Reserve VIP Room</h2><br></br>
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
                            <option value=""> Select Time </option>
                            {availableTimeSlots.map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <p style={{ color: 'green' }}>One reservation is only available for one hour.</p>
                    </div>
                    <button className='btn' type="submit" style={{ width: '250px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '55px' }}>{loading ? 'Checking...' : 'Check Availability'}</button>
                    {availability &&
                    <button className='btn' onClick={handleSubmit} style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px'}}>Book VIP Room</button>
                    }
                    {showAvailabilityMessage && !loading &&
                        <p style={{ color: 'red' }}>This reservation is not available. Please select a different date/time.</p>
                    }
                </form>
            </div><br></br>
        </div>
    );
};

export default VIPRoomReservations;