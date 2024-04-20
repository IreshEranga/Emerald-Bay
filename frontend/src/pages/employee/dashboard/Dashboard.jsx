import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from 'react-hot-toast';
import { Button, Table } from "react-bootstrap";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

 // const [leaves, setLeaves] = useState([]);
  //const [totalEmployeeCount, setEmployeeCount] = useState(0);

  // useEffect(() => {
  //   const fetchLeaveForEmployee= async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/api/leaves/employee/${user.name}`);
  //       setLeaves(response.data.leave);
  //       // Calculate and set total delivery count
  //       const count = response.data.leave.length;
  //       setEmployeeCount(count);
  //     } catch (error) {
  //       console.error('Error fetching leaves:', error);
  //       toast.error('Error fetching leaves');
  //     }
  //   };

  //   if (user && user.role === 'EMPLOYEE') {
  //       fetchLeaveForEmployee();
  //   }
  //}, [user]);

  // const handleEditStatus = async (employeeid) => {
  //  try {
  //     await axios.put(`http://localhost:8000/api/leave/update/status/${employeeid}`);
  //     toast.success('Order status updated successfully');
  //      // Refetch orders after status update
  //      fetchLeaveForEmployee();
  //    } catch (error) {
  //      console.error('Error updating leave status:', error);
  //      //toast.error('Error updating order status');
  //    }
  //  };

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}  -   {user.name}</strong>
        </div>
      )}
      </div>
  );
};

export default Dashboard;
