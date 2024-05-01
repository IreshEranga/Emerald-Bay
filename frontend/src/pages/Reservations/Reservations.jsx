import React from "react";
import { Link } from "react-router-dom";
import NavBar from '../../components/Navbar';
import './Reservations.css';
import TableReservation from '../../assets/IMG_9943.jpg';
import VIPRoom from '../../assets/IMG_0004.jpg';
import Events from '../../assets/IMG_0005.jpg';
import Footer from "../../components/Footer.js";


const Reservations = () => {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <NavBar />

      <div className="reservations"></div>

      <div className="reservations-container">
        <br /><br />
        <h2>DINE AT ONE OF THE BEST RESTAURANTS IN MIRISSA.<br />
          AN EXCLUSIVE CULINARY JOURNEY</h2>
        <br /><br />
        <div className="reservation-categories">

          <div className="reservation-category">
            <br /><br /><br />
            <h3>ALL DAY DINING</h3><br />
            <img src={TableReservation} style={{ width: '650px', borderRadius: '10px', alignContent: 'center' }} alt="TableReservation" className="image-hover" />
            <br /><br /><br />
            <p>THERE’S SOMETHING FOR EVERYONE<br />
              Sample a variety of flavors from around the world whether for breakfast or dinner at our All Day Dining Restaurant. <br />Book a table for dining in our restaurant.</p>
            <br /><Link to="/table-reservations"><button className='btn' style={{width: '250px', padding: '10px', backgroundColor:'#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Book Now</button></Link>
          </div><br /><br />

          <div className="reservation-category">
            <br /><br />
            <h3>SCARLET ROOM</h3><br />
            <img src={VIPRoom} style={{ width: '650px', borderRadius: '50%', alignContent: 'center' }} alt="VIPRoom" className="image-hover" />
            <br /><br /><br />
            <p>An upscale meeting location with the facilities of star class service. The Scarlet Room is a specialized location designed for corporate meetings. Use the Scarlet Room for presentations, interviews, client pitches, or training for your company. It is fully equipped with projection equipment and tastefully furnished to give you the full meeting experience.<br />Reserve our VIP room for private events.</p>
            <br /><Link to="/vip-room-reservations"><button className='btn' style={{width: '250px', padding: '10px', backgroundColor:'#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Book Now</button></Link>
          </div><br /><br />

          <div className="reservation-category">
            <br /><br />
            <h3>EVENTS</h3><br />
            <img src={Events} style={{ width: '650px', borderRadius: '10px', alignContent: 'center' }} alt="Events" className="image-hover" />
            <br /><br /><br />
            <p>Discover the enchanting allure of our venue nestled by the poolside, offering a serene ambiance perfect for indulging in cocktails, hosting private soirées, celebrating parties, and sharing intimate dinners.<br />Host your event in our outdoor space for creating unforgettable memories and cherished moments.</p>
            <br /><Link to="/events"><button className='btn' style={{width: '250px', padding: '10px', backgroundColor:'#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Book Now</button></Link><br /><br />
          </div><br /><br/>
          
        </div>
      </div><br/><br/>
      <Footer />
    </div>
  );
};

export default Reservations;