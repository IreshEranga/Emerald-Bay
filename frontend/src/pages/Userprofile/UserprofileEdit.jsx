import React, { useState, useEffect } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';
import './UserprofileEdit.css';
import toast from 'react-hot-toast';
import { LinkContainer } from 'react-router-bootstrap';

const UserprofileEdit = () => {
  const { user } = useAuthStore(); // Assuming useAuthStore provides user information
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    status: '',
    password: ''
  });

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
        setFormData(data.user); // Set form data initially to fetched user data
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/customer/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      toast.success("Customer update successfully!!");
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updateCustomer = await response.json();
      setProfileData(updateCustomer.user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error.message);
    }
  };

  const handleDeleteConfirmation = () => {
    // Implement your custom confirmation logic here
    // You can use a modal or custom component for confirmation
    return new Promise((resolve) => {
      const confirmed = window.confirm("Are you sure you want to delete your profile?");
      resolve(confirmed);
    });
  };

  const handleDelete = async () => {
    try {
      const confirmed = await handleDeleteConfirmation();
      if (!confirmed) {
        return; // Do nothing if user cancels the operation
      }
  
      const response = await fetch(`http://localhost:8000/customer/delete/${user._id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }else{
        toast.success("Profile deleted successfully!!");
        navigate('/login'); // Navigate to the login page
      }
  
      toast.success("Profile deleted successfully!!");
      // Don't navigate to login page here
    } catch (error) {
      console.error('Error deleting user profile:', error);
      setError(error.message);
    }
  };
  
  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));
  
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

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
    <div style={{ backgroundColor: 'white' }}>
      <Navbar_customer />
      <div className="profile-container">
        <h1 className='userprofile'>Update User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile-details" key={user._id}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            
            {/* Display other profile details as needed */}
            <button type="submit" className="btn btn-primary">Update Profile</button>
           
            <LinkContainer to="/logout">
              <button type="button" className="btn btn-danger delete-profile" onClick={() => { handleDelete(); handleLogout(); }}>Delete Profile</button>
            </LinkContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserprofileEdit;
