// EmployeeLeaves.jsx
import React from 'react';
import ApplyLeaves from './ApplyLeaves'; // Import the ApplyLeaves component
import { useLeavesStore } from "../../../store/useLeavesStore";
import './EmployeeLeaves.css';

const EmployeeLeaves = () => {
  const { isApplyLeavesOpen, openApplyLeaves, closeApplyLeaves } = useLeavesStore(); // Destructuring from the store

  const handleApplyLeaveClick = () => {
    openApplyLeaves(); // Open the ApplyLeaves form
  };

  return (
    <div className="employee-leaves-container">
      <h1>Leave Application Page</h1>
      <div className="center-button">
        <button onClick={handleApplyLeaveClick}>Apply Leave</button>
      </div>
      {/* Conditional rendering of ApplyLeaves component */}
      {isApplyLeavesOpen && <ApplyLeaves />} {/* Render ApplyLeaves if isApplyLeavesOpen is true */}
    </div>
  );
};


export default EmployeeLeaves;
