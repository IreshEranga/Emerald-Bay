import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from '../../components/Navbar'; 
import aboutimg from '../../assets/IMG_501.avif';
import foodstock from '../../assets/foodstock.png';
import './AboutUs.css';

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
          
          </div>*/}
    
    <div className="welcome">
              <h1>EMERALD BAY RESTAURANT</h1>
              <h3>Bringing the authentic Sri Lankan culinary experience to the Heart of Mirissa.🌴 </h3>
            </div>
    
            <div className="about-us-container">
      <h1>About Us</h1>
      <p>Welcome to our restaurant! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ultricies risus.</p>
    </div>
    
            <div className="aboutsec">
              <div className="leftsection">
                <h3 className='abouth3'>Two Simple reasons , One Simple Answer</h3>
                <h1 className='abouth1'>Why EMERALD BAY?</h1>
                <p className="aboutdescription">
                Designed to be the Culinary epicenter, We try to uphold the traditions of the Local Household while bringing out the avours of Sri Lanka with a bounty of fresh seasonal ingredients. We take extra care to deliver fresh farm produce to a local classy table cuisine with an emphasis on seasonal & locally sourced ingredients and with the freshest Seafood.
                </p>
              </div>
    
              <div className="rightsection">
                <img src={aboutimg} alt="about food" style={{width:'800px'}} />
              </div>
            </div>
    
            <div className="offersec">
              
              <div className="leftsection">
              <img  src={foodstock} style={{width:'1000px', height:'500px'}} alt='foodstock'/>
              </div>
    
              <div className="rightsection" style={{backgroundColor:'black'}}>
               <h1 className='offerh1' style={{fontFamily:'cursive', fontWeight:'1000', color:'yellow'}}>We Offer</h1> <br />
               <br />
               <h1 className='offerh12'>WONDERFUL <br /> FLAVOURS</h1>
               <hr className="flavours-line" />
               <p className="offerp">
               We want you to sit down and enjoy your meal just like the way you enjoy your homemade dishes! We have embarked on this journey and e are glad that you have taken the time off of your schedule to know our story to experience our experience.
               </p>
              </div>
              
            </div>
    
          <br />
            
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
       
    </div>


  );
};

export default AboutUs;