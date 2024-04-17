/*import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';


const Userprofile = () => {
  const { user } = useAuthStore(); // Assuming useAuthStore provides user information

  return (
    <div style={{ backgroundColor: 'black' }}>
      <Navbar_customer />
      <div style={{ color: 'white', padding: '20px' }}>
        <h1>User Profile</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user._id}</p>
            
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    </div>
  );
}

export default Userprofile;*/

import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';

const Userprofile = () => {
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
    <div style={{ backgroundColor: 'black' }}>
      <Navbar_customer />
      <div style={{ color: 'white', padding: '20px' }}>
        <h1>User Profile</h1>
        <div key={user._id}>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Mobile: {profileData.mobile}</p>
          <p>Address: {profileData.address}</p>
          {/* Display other profile details as needed */}
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
