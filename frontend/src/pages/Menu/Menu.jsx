import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from '../../components/Navbar'; 
import './Menu.css';


/*const Menu = () => {
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
};*/

//export default Menu;


const Menu = () => {
    return (   
        <div style={{backgroundColor:'black'}}>
    
              <NavBar />

        <div className="menu-container">
            <section className="menu-section">
                <h2>Side Dishes</h2>
                <ul className="menu-items">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    {/* Add more items as needed */}
                </ul>
            </section>

            <section className="menu-section">
                <h2>Beverages</h2>
                <ul className="menu-items">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    {/* Add more items as needed */}
                </ul>
            </section>

            <section className="menu-section">
                <h2>Salads</h2>
                <ul className="menu-items">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    {/* Add more items as needed */}
                </ul>
            </section>

            <section className="menu-section">
                <h2>Rices</h2>
                <ul className="menu-items">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    {/* Add more items as needed */}
                </ul>
            </section>
        </div>
        </div>
    );
}

export default Menu;