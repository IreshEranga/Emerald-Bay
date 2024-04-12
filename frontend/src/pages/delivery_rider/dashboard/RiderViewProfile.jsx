import React, { useEffect, useState } from "react";
import { useRider } from "../../../hooks/useRiderData";
import { useAuthStore } from "../../../store/useAuthStore";
import "./profileview.css";

const RiderViewProfile = () => {
  

  const { user } = useAuthStore();
  const { data: rider, refetch } = useRider(user && user._id);


  return (
    <div className="profilecontainer">
      <div className="profilesectionviewrider">
        {/*<h1>👨‍💻 Profile : {rider && rider.data && rider.data.rider ? rider.data.rider.name : ""}</h1>*/}
        
        <div className="personalinfo" style={{ backgroundColor: '#ffffff', padding: '50px', border: '1px solid black', borderRadius: '45px', width:'50%', marginLeft:'250px', color:'black' }}>
          {rider && rider.data && rider.data.rider && (
            <>
            <img src={rider.data.rider.image} alt="" style={{width:'100px', height:'100px',border:'3px solid black', marginLeft:'200px', borderRadius:'50%' }}/>
              <label className="first">Employee ID <span className="dot">:</span> <span className="inputdata">{rider.data.rider.employeeid}</span></label>
              <label className="first">Name <span className="dot">:</span> <span className="inputdata">{rider.data.rider.name}</span></label>
              <label className="first">Email <span className="dot">:</span> <span className="inputdata">{rider.data.rider.email}</span></label>
              <label className="first">Address <span className="dot">:</span> <span className="inputdata">{rider.data.rider.address}</span></label>
              <label className="first">Contact <span className="dot">:</span> <span className="inputdata">0{rider.data.rider.contact}</span></label>
              <label className="first">Role <span className="dot">:</span> <span className="inputdata">{rider.data.rider.role}</span></label>
              <label className="first">Status <span className="dot">:</span> <span className="inputdata">{rider.data.rider.status}</span></label>
              <label className="first">Rides <span className="dot">:</span> <span className="inputdata">{rider.data.rider.rides}</span></label>
            </>
          )}
        </div>
      </div><br /><br />
      
    </div>
  );
};

export default RiderViewProfile;
