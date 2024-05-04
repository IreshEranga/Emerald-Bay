import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import './MembershipForm.css';
import toast from 'react-hot-toast';


const MembershipForm = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
  
    name: '',
    email: '',
    mobile: '',
    membershipType: ''
  });

  // Fetch user data using useAuthStore
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchProfileData = async (userId) => {
      try {
        if (!userId || !userId._id) {
          throw new Error('User ID not available');
        }

        const response = await axios.get(`http://localhost:8000/customer/get/${userId._id}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch profile data');
        }

        setProfileData(response.data.user);
        setFormData(prevFormData => ({ ...prevFormData, ...response.data.user }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfileData(user);
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to save the form data
      await axios.post('http://localhost:8000/loyaltycustomers/add', formData);
      // Optionally, you can redirect the user or show a success message
      toast.success("Request for loyalty customer registered successfully!!");
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error states (show error message, etc.)
    }
  };

  return (
    <div className="membership-form-page" style={{
      marginLeft:'55px', marginTop:'40px'
    }}>
      <div className="membership-form-container">
        <h2 className='title'>Membership Form</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>

            
            <div>
              <label>Name:</label>
              <input  type="text" name="name" value={formData.name} onChange={handleChange} disabled />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled />
            </div>
            <div>
              <label>Mobile:</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} disabled />
            </div>
            <div>
              <label className='membership'>Membership Type:</label>
              <select name="membershipType" value={formData.membershipType} onChange={handleChange} required>
                <option value="">Select Membership Type</option>
                <option value="loyalty">Loyalty</option>
                
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MembershipForm;
