import React, { useEffect, useState } from "react";
import { useEmployee } from "../../../hooks/useEmployeeData";
import { useAuthStore } from "../../../store/useAuthStore";
import "./profileview.css";

const EmployeeViewProfile = () => {
  

  const { user } = useAuthStore();
  const { data: employee, refetch } = useEmployee(user && user._id);
 


  return (
    <div className="profilecontainer">
      <div className="profilesectionviewrider">
        {/*<h1>👨‍💻 Profile : {rider && rider.data && rider.data.rider ? rider.data.rider.name : ""}</h1>*/}
        
        <div className="personalinfo" style={{ backgroundColor: '#ffffff', padding: '50px', border: '1px solid black', borderRadius: '45px', width:'50%', marginLeft:'250px', color:'black' }}>
          {employee && employee.data && employee.data.employee && (
            <>
            <img src={employee.data.employee.image} alt="" style={{width:'150px', height:'150px',border:'3px solid black', marginLeft:'200px', borderRadius:'50%' }}/>
              <label className="first">Employee ID <span className="dot">:</span> <span className="inputdata">{employee.data.employee.employeeid}</span></label>
              <label className="first">Name <span className="dot">:</span> <span className="inputdata">{employee.data.employee.name}</span></label>
              <label className="first">Email <span className="dot">:</span> <span className="inputdata">{employee.data.employee.email}</span></label>
              <label className="first">Address <span className="dot">:</span> <span className="inputdata">{employee.data.employee.address}</span></label>
              <label className="first">Contact <span className="dot">:</span> <span className="inputdata">{employee.data.employee.phone}</span></label>
              <label className="first">Role <span className="dot">:</span> <span className="inputdata">{employee.data.employee.role}</span></label>
             
              
            </>
          )}
        </div>
      </div><br /><br />
      
    </div>
  );
};

export default EmployeeViewProfile;
