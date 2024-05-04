import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import Navbar_customer from '../../components/Navbar_customer'; 
import restaurantImage from '../../assets/IMG_9995.jpg';
import Footer from "../../components/Footer.js";
import FeedbackForm from "../home/feedbackpage.js"

const Customer_Home= () => {
    /*const { isAuthenticated, logout, user } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        logout: state.logout,
        user: state.user,
      }));
      //*/
      localStorage.setItem('customerLogin', 'true');
      return (
    
        <div style={{backgroundColor:'black'}}>
    
              <Navbar_customer />
    
            <div className="about-us-container">
            <div className="about-us-content">
                <img src={restaurantImage} alt="Restaurant" className="restaurant-image" /><br></br><br></br>

                <div className="restaurant-details">
                    <h1>WELCOME TO EMERALD BAY !</h1><br></br>
                    <p>We strive to provide a unique dining experience for all our guests.
                    Our chefs are passionate about crafting delicious dishes using the freshest ingredients sourced locally whenever possible.
                    From appetizers to desserts, we aim to tantalize your taste buds with our diverse menu options.
                    At our restaurant, we believe in creating memorable moments for our customers, whether it's a romantic dinner for two or a lively gathering with friends and family.
                    Come join us and embark on a culinary journey that promises to delight your senses.</p>
                </div><br></br>
                <FeedbackForm/>
            </div>           
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />      
        </div><br/><br/>
          <Footer />
    </div>
  );
};

export default Customer_Home;