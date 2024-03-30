import React, { useState } from "react";
import {Link } from "react-router-dom";
//import { useAuthStore } from "../../store/useAuthStore";
import NavBar from '../../components/Navbar';
import './Reservations.css';
import TableReservation from '../../assets/IMG_9975.jpg';
import VIPRoom from '../../assets/IMG_9981.jpg';
import Events from '../../assets/IMG_0001.jpg';


/*const Reservations = () => {
    const { isAuthenticated, logout, user } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        logout: state.logout,
        user: state.user,
      }));
      //
      return (
    
        <div style={{backgroundColor:'black'}}>
    
              <NavBar />
            
        {/*<div className="container d-flex flex-column align-items-center">
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
          )}   
          
          </div>*/
    
    /*<div className="welcome">
              <h1>EMERALD BAY RESTAURANT</h1>
              <h3>Bringing the authentic Sri Lankan culinary experience to the Heart of Mirissa.🌴 </h3>
            </div>
            
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
 
    </div>

  );
};

export default Reservations;*/


const Reservations = () => {
  const [showReservationForm, setShowReservationForm] = useState(false);

  const handleBookNow = () => {
      setShowReservationForm(true);
  };

  return (

    <div style={{backgroundColor:'black'}}>
    
              <NavBar />

    <div className="reservations">
    </div>

    <div className="reservations-container"><br></br><br></br>
      <h2>DINE AT ONE OF THE BEST RESTAURANTS IN MIRISSA.<br></br>
        AN EXCLUSIVE CULINARY JOURNEY</h2><br></br><br></br>
      <div className="reservation-categories">
        <div className="reservation-category"><br></br><br></br><br></br>
          <h3>ALL DAY DINING</h3><br></br>
          <img src={TableReservation} style={{width:'650px', alignContent:'center'}} alt="TableReservation" />
          <br></br><br></br><br></br>
          <p>THERE’S SOMETHING FOR EVERYONE<br></br>
Sample a variety of flavours from around the world whether for breakfast or dinner at our All Day Dining Restaurant. <br></br>Book a table for dining in our restaurant.</p>
          <br></br><Link to="/table-reservations"><button>Book Now</button></Link>
        </div><br></br><br></br>
        <div className="reservation-category"><br></br><br></br>
          <h3>VIP Room</h3><br></br>
          <img src={VIPRoom} style={{width:'650px', alignContent:'center'}} alt="VIPRoom" />
          <br></br><br></br><br></br>
          <p>An upscale meeting location with the facilities of star class service. The Scarlet Room is a specialized location designed for corporate meetings. Use the Scarlet Room for presentations, interviews, client pitches or training for your company. It is fully equipped with projection equipment and tastefully furnished to give you the full meeting experience.<br></br>Reserve our VIP room for private events.</p>
          <br></br><Link to="/vip-room-reservations"><button>Book Now</button></Link>
        </div><br></br><br></br>
        <div className="reservation-category"><br></br><br></br>
          <h3>Outdoor Events</h3><br></br>
          <img src={Events} style={{width:'650px', alignContent:'center'}} alt="Events" />
          <br></br><br></br><br></br>
          <p>Set under plush greenery, surrounded by decades-old trees decorated in fairy lights, this beautiful venue offers a very relaxed environment that is ideal for cocktails, private parties and intimate dinners.<br></br> Host your event in our outdoor space.</p>
          <br></br><Link to="/events"><button>Book Now</button></Link><br></br><br></br>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Reservations;