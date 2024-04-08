import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import Navbar_customer from '../../components/Navbar_customer'; 
import restaurantImage from '../../assets/IMG_9995.jpg';


const Customer_Home= () => {
    const { isAuthenticated, logout, user } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        logout: state.logout,
        user: state.user,
      }));
      //
      return (
    
        <div style={{backgroundColor:'black'}}>
    
              <Navbar_customer />
    
            <div className="about-us-container">
            <div className="about-us-content">
                <img src={restaurantImage} alt="Restaurant" className="restaurant-image" /><br></br><br></br>
                <div className="restaurant-details">
                    <h1>ABOUT OUR RESTAURANT</h1><br></br>
                    <p>Welcome to our restaurant! We strive to provide a unique dining experience for all our guests.</p>
                    <p>Our chefs are passionate about crafting delicious dishes using the freshest ingredients sourced locally whenever possible.</p>
                    <p>From appetizers to desserts, we aim to tantalize your taste buds with our diverse menu options.</p>
                    <p>At our restaurant, we believe in creating memorable moments for our customers, whether it's a romantic dinner for two or a lively gathering with friends and family.</p>
                    <p>Come join us and embark on a culinary journey that promises to delight your senses.</p>
                </div><br></br>
                <div className="contact-details"><br></br>
                    <h2>Contact Us</h2><br></br>
                    <p><strong>Address:</strong> Badugoda Junction, Harbour Road, Mirissa, Sri Lanka.</p>
                    <p><strong>Phone:</strong><a href="tel:0705320812" class="contact-link">+94 772120231</a></p>
                    <p><strong>Email:</strong> <a href="mailto:emeraldbayresortmirissa@gmail.com" class="contact-link">emeraldbayresortmirissa@gmail.com</a></p>
                    <p><strong>Facebook:</strong> <a href="https://www.facebook.com/profile.php?id=61552540748705&mibextid=LQQJ4d" class="social-link">Emerald Bay Resort</a></p>                   
                </div><br></br>
            </div>
      
    
          <br />
            
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
       
    </div>
    </div>


  );
};

export default Customer_Home;