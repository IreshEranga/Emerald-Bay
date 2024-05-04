import React, { useState, useEffect } from 'react';
import './Attendance.css';
// import TableSeatsReservation from '../../assets/restaurant seat reservation.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { useEmployee } from '../../hooks/useEmployeeData';
import { useRider } from '../../hooks/useRiderData';



const Attendance = () => {

    const {user} = useAuthStore();
    const { data: employee, refetch } = useEmployee(user && user._id);
    const { data: rider, refetchRider } = useRider(user && user._id);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        EmpID: '',
        name: '',
        email: '',
        role: '',
        date: getTodayDate(),
        time: ''
    });
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        setAvailableTimeSlots(generateTimeSlots(formData.date));
    }, [formData.date]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function getTodayDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const generateTimeSlots = (selectedDate) => {
        const today = new Date();
        const selected = new Date(selectedDate);
        const isToday = today.toDateString() === selected.toDateString();
        const startTime = isToday ? today.getHours() : 8;
        const endTime = 22;
        const slots = [];
        for (let i = startTime; i <= endTime; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = (i < 10) ? `0${i}` : `${i}`;
                const minute = (j === 0) ? '00' : '30';
                slots.push(`${hour}:${minute}`);
            }
        }
        return slots;
    };

    const validateForm = (data) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        /*if (!((employee && employee.data && employee.data.employee && employee.data.employee.employeeid)||(rider && rider.data && rider.data.rider && rider.data.rider.employeeid)).trim()) {
            errors.EmpID = "Employee ID is required";
        }
        if (!((employee && employee.data && employee.data.employee && employee.data.employee.name)||(rider && rider.data && rider.data.rider && rider.data.rider.name)).trim()) {
            errors.name = "Name is required";
        }
        if (!(employee && employee.data && employee.data.employee && employee.data.employee.email).trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test((employee && employee.data && employee.data.employee && employee.data.employee.email).trim())) {
            errors.email = "Invalid email address";
        }
        if (!(employee && employee.data && employee.data.employee && employee.data.employee.role)) {
            errors.role = "Role is required";
        }*/
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsObj = validateForm(formData);
        if (Object.keys(errorsObj).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/attendance/create', formData);
                console.log(response.data);
                toast.success('Attendance Marked successfully!');
                setTimeout(() => {
                    window.history.back();
                }, 1000);
            } catch (error) {
                console.error('Error submitting attendance :', error);
                toast.error('Error attendance. Please try again later.');
            }
        } else {
            setErrors(errorsObj);
        }
    };

    
  // Fetch the actual values for name, email, and role
  useEffect(() => {
    if (employee) {
      setFormData((prevState) => ({
        ...prevState,
        EmpID:employee.data.employee.employeeid,
        name: employee.data.employee.name,
        email: employee.data.employee.email,
        role: employee.data.employee.category,
      }));
    } else if (rider) {
      setFormData((prevState) => ({
        ...prevState,
        EmpID:rider.data.rider.employeeid,
        name: rider.data.rider.name,
        email: rider.data.rider.email,
        role: rider.data.rider.role,
      }));
    }
  }, [employee, rider]);

    return (
        <div className="outer-container15">
            <br />
            <div className="attendance">
                {/* <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => window.history.back()} /> */}
                <h2 className="center-heading">Mark Attendance</h2>
              
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Emp ID :</label>
                        <input type="text" name="EmpID" value={formData.EmpID}
                        /*value={(employee && employee.data && employee.data.employee && employee.data.employee.employeeid)|| (rider && rider.data && rider.data.rider && rider.data.rider.employeeid)}*/ onChange={handleChange} 
                        readOnly />
                        {errors.EmpID && <span className="error">{errors.EmpID}</span>}
                        
                    </div>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" name="name" /*value={(employee && employee.data && employee.data.employee && employee.data.employee.name)|| (rider && rider.data && rider.data.rider && rider.data.rider.name)}*/ value={formData.name} onChange={handleChange}  readOnly/>
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="email" name="email" /*value={(employee && employee.data && employee.data.employee && employee.data.employee.email)|| (rider && rider.data && rider.data.rider && rider.data.rider.email)}*/ value={formData.email} onChange={handleChange}  readOnly/>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label> Role:</label>
                        <input type="email" name="email" value={formData.role} /*value={(employee && employee.data && employee.data.employee && employee.data.employee.category)|| (rider && rider.data && rider.data.rider && rider.data.rider.role)}*/ onChange={handleChange}   readOnly/>
                        
                        {errors.role && <span className="error">{errors.role}</span>}
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
                        
                    </div>
                    <button className='btn' type="submit" style={{ width: '250px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', marginLeft: '55px' }}>Submit</button>
                </form>
            </div>
            <br />
        </div>
    );
};

export default Attendance;
