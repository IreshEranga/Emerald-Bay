import React, { useState } from 'react';
import Navbar_customer from "../../components/Navbar_customer";
import MembershipForm from "../../pages/Membership/MembershipForm"; // Import the MembershipForm component
import './Membership.css';

const Membership = () => {
  const [showForm, setShowForm] = useState(false); // State variable to toggle the visibility of the form

  const handleButtonClick = () => {
    setShowForm(true); // Set showForm state to true when the button is clicked
  };

  return (
    <div>

        
      <Navbar_customer />

      <button className='button' style={{padding:'20px', marginLeft:'1300px'}} onClick={handleButtonClick}>Apply for Membership</button>
      <div className='imagemem'><br /><br />
        <p className='topic'>"Unveiling the Secret Society 👨‍👩‍👧‍👦 Unlock Hidden Treasures with Our Exclusive Membership Card!" It 
        hints at the allure of belonging to an exclusive 
        community and promises members access to unique perks and experiences.</p>

        
        {/* Display the MembershipForm component if showForm state is true */}
        {showForm && <MembershipForm />}
      </div>
    </div>
  );
}

export default Membership;
