import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from '../../components/Navbar'; 
import restaurantImage from '../../assets/IMG_9995.jpg';
import './AboutUs.css';
import { FaPhone, FaEnvelope, FaFacebookSquare, FaMapMarker } from 'react-icons/fa';


const AboutUs = () => {
    const { isAuthenticated, logout, user } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        logout: state.logout,
        user: state.user,
      }));
      //
      return (
    
        <div style={{backgroundColor:'black'}}>
    
              <NavBar />

            <div className="about-us-container">
            <div className="about-us-content">
                <img src={restaurantImage} alt="Restaurant" className="restaurant-image" /><br></br><br></br>

                <div className="restaurant-details">
                    <h1>ABOUT OUR RESTAURANT</h1><br></br>
                    <p>Welcome to our Restaurant ! We strive to provide a unique dining experience for all our guests.
                    Our chefs are passionate about crafting delicious dishes using the freshest ingredients sourced locally whenever possible.
                    From appetizers to desserts, we aim to tantalize your taste buds with our diverse menu options.
                    At our restaurant, we believe in creating memorable moments for our customers, whether it's a romantic dinner for two or a lively gathering with friends and family.
                    Come join us and embark on a culinary journey that promises to delight your senses.</p>
                </div><br></br>

                <div className="contact-details"><br></br>
                <h2>CONNECT WITH US</h2>
                <p className="contactme">
                  <FaPhone className="icon" /><span className="dot"> :  </span><a href="tel:+94772120231" className="contact-link"> +94 772120231</a>
                </p>
                <p className="contactme">
                  <FaEnvelope className="icon" /><span className="dot"> :  </span><a href="mailto:emeraldbayresortmirissa@gmail.com" className="contact-link"> emeraldbayresortmirissa@gmail.com</a>
                </p>
                <p>
                  <FaFacebookSquare className="icon" /><span className="dot"> :  </span><a href="https://www.facebook.com/profile.php?id=61552540748705&mibextid=LQQJ4d" className="social-link"> Emerald Bay Resort</a>
                </p>
                <p>
                  <FaMapMarker className="icon" /> <span className="dot"> :  </span> Badugoda Junction, Harbour Road, Mirissa, Sri Lanka.
                </p>
                </div><br></br>
                <div className="gmapframe">
                <iframe id='gmapcanvas' title="Map" width="600" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;q=Emerald%20Bay%20Resort%20Badugoda%20Junction,%20Harbour%20Road,%20Mirissa%2081740+(Emerald%20Bay%20Restaurant)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=C&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
                </div><br></br>

              </div>          
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />      
        </div>
    </div>
  );
};

export default AboutUs;