import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';


const User_Reservations = () => {
  const { user } = useAuthStore(); // Assuming useAuthStore provides user information
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('User ID:', user._id);
    
        if (!user || !user._id) {
          throw new Error('User ID not available');
        }
    
        const response = await fetch(`http://localhost:8000/customer/get/${user._id}`, {
          method: 'GET',
        });
    
        console.log('Response status:', response.status); // Log response status
    
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
    
        const data = await response.json();
        console.log('Data from backend:', data); // Log data received from backend
        setProfileData(data.user); // Assuming the data structure has a 'user' property
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  if (isLoading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error fetching user profile: {error}</p>;
  }

  if (!profileData) {
    return <p>No profile data available</p>;
  }

  return (
    <div style={{backgroundColor:'white'}}>
    <Navbar_customer />
    <div className="profile-container">
      <h1 className='userprofile' style={{paddingLeft:'120px', paddingRight:'10px', color:'maroon', fontFamily:'Times New Roman, Times, serif'}}>My Reservations</h1>
      
    </div>
  </div>
  
  );
}

export default User_Reservations;