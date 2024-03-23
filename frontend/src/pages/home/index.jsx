import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, logout, user } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
    user: state.user,
  }));
  //
  const navigate = useNavigate();

  // Define the function to navigate to the feedback page
  const handleFeedback = () => {
    console.log("feedback");
    navigate('/feedback')
  }
  return (
    
    <div className="container d-flex flex-column align-items-center">
      {/** 
      <h1 className="text-center mt-5">Suppliers Management</h1>
      {!isAuthenticated ? (
        <div className="flex-row d-flex justify-content-center mt-5 w-100">
          <button className="btn btn-primary col-2 m-2">
            <a href="/login" className="text-white">
              Login
            </a>
          </button>
        </div>
      ) : (
        <div className="flex-row d-flex justify-content-center mt-5 w-100">
          <button className="btn btn-primary col-2 m-2">
            <a
              href={user.role === "ADMIN" ? "/admin" : "/supplier"}
              className="text-white"
            >
              Dashboard
            </a>
          </button>
          <button onClick={logout} className="btn btn-primary col-2 m-2">
            Logout
          </button>
        </div>
      )}    */}
      <h1>Emerald Bay Restaurant</h1>
      <button onClick={() => handleFeedback()}>Feedback</button>
    </div>
  );
};

export default Home;
