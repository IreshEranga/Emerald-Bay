import React, { useEffect, useState } from "react";

import RiderAPI from "../../../api/RiderAPI";

import { useRiderStore } from "../../../store/useRiderStore";
import { useRider } from "../../../hooks/useRiderData";
import { useCategoryData } from "../../../hooks/useCategoryData";
import { useAuthStore } from "../../../store/useAuthStore";
import "./profileview.css";

const RiderViewProfile = () => {
  

  const { user } = useAuthStore();
  const { data: rider, refetch } = useRider(user && user._id);

 

  // Form state
  {/*const [formData, setFormData] = useState({
    employeeid: "",
    name: "",
    address: "",
    contact: "",
    email: "",
    rides: "",
    image: "",
    password: "",
  });*/}

  {/*useEffect(() => {
    if (rider && rider.data && rider.data.rider) {
      setFormData({
        employeeid: rider.data.rider.employeeid || "",
        name: rider.data.rider.name || "",
        address: rider.data.rider.address || "",
        contact: rider.data.rider.contact || "",
        email: rider.data.rider.email || "",
        rides: rider.data.rider.rides || "",
        //category: rider.data.rider.category || "",
        image: rider.data.rider.image || "",
      });
    }
  }, [rider]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };*/}

  {/*const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload({
      file,
      setPercent,
      setImage: (url) => {
        setFormData((prevState) => ({
          ...prevState,
          image: url,
        }));
      },
    });
  };*/}

  // Update mutation
   {/*const onSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };
    if (!dataToSend.password) {
      delete dataToSend.password; // Remove password from data if it's empty
    }

    // Call API to update rider
   try {
      await RiderAPI.update({ data: dataToSend, id: user._id });
      // reset form
      setFormData({
        name: "",
        address: "",
        contact: "",
        email: "",
        category: "",
        image: "",
        password: "",
      });
      refetch();
      Toast({ type: "success", message: "Rider updated successfully" });
      setShowForm(false);
    } catch (error) {
      Toast({ type: "error", message: error.message });
    }
  };*/}

  return (
    <div className="profilecontainer">
      <div className="profilesection">
        <h1>👨‍💻 Profile : {rider && rider.data && rider.data.rider ? rider.data.rider.name : ""}</h1>
        <button className="profileeditbtn" style={{ marginLeft: "900px", backgroundColor: "white", border: "1px solid white" }}>
          
        </button>
        <div className="personalinfo" style={{ backgroundColor: '#3457D5', color: 'white', padding: '50px', border: '1px solid black', borderRadius: '45px' }}>
          {rider && rider.data && rider.data.rider && (
            <>
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
