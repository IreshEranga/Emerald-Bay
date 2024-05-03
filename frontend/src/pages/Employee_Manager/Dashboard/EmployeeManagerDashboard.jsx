//import React from "react";
import React, { useState, useEffect } from "react";
import { useEmployeeCount, useEmployeeData } from "../../../hooks/useEmployeeData";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";

const Index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  
  // Get the data from the react-query hook
  const [attendanceCount, setAttendanceCount] = useState(0);
  const { data: employeeData } = useEmployeeCount();
  const { data: employeeDetails, refetch: refetchEmployeeData } = useEmployeeData();
  
  //const { data: attendanceData } = useAttendanceCount();

  //console.log("Employee Data:", employeeData);
  useEffect(() => {
    if (employeeDetails) {
      // Process rider data here
      console.log("Employee data:", employeeDetails);
      //createChart(employeeDetails.data.employees);
    }
  }, [employeeDetails]);
  

  useEffect(() => {
    // Fetch count of all table reservations
    const fetchAttendanceCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/attendance/count");
        setAttendanceCount(response.data.count);
      } catch (error) {
        console.error("Error fetching tattendance count:", error);
      }
    };

    fetchAttendanceCount();
  }, []);
  
  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">👨‍💼 Total Employees</h5>
              <p className="card-text fs-4 fw-bold">
                {employeeData?.data?.employeeCount}
              </p>
            </div>
          </div>
        </div>

         <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📅 Total Attendance</h5>
              <p className="card-text fs-4 fw-bold">
                {attendanceCount}
              </p>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Index;
