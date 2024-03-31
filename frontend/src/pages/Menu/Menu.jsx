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

    <div className="outer-container5">
    <div className="menu-container"><br></br><br></br>
      <h1 className="menu-title">Our Menu</h1><br></br>
      <div className="category"><br></br>
        <h2 className="center-heading1">Beverages</h2>
        <ul className="menu-list">
          <li className="menu-item">Coffee <span className="price">$2.50</span></li>
          <li className="menu-item">Tea <span className="price">$2.00</span></li>
          <li className="menu-item">Soda <span className="price">$1.75</span></li>
          <li className="menu-item">Smoothies <span className="price">$4.00</span></li>
          <li className="menu-item">Mocktails <span className="price">$5.00</span></li>
        </ul>
      </div>
      <div className="category"><br></br>
        <h2 className="center-heading1">Side Dishes</h2>
        <ul className="menu-list">
          <li className="menu-item">Fries <span className="price">$3.00</span></li>
          <li className="menu-item">Onion Rings <span className="price">$3.50</span></li>
          <li className="menu-item">Mozzarella Sticks <span className="price">$4.50</span></li>
          <li className="menu-item">Garlic Bread <span className="price">$2.75</span></li>
          <li className="menu-item">Chicken Wings <span className="price">$6.00</span></li>
        </ul>
      </div>
      <div className="category"><br></br>
        <h2 className="center-heading1">Soups</h2>
        <ul className="menu-list">
          <li className="menu-item">Chicken Soup<span className="price">$2.00</span></li>
          <li className="menu-item">Roasted Pumpkin Soup<span className="price">$1.50</span></li>
          <li className="menu-item">Vegetable Soup<span className="price">$1.00</span></li>
          <li className="menu-item">Seafood Soup<span className="price">$4.50</span></li>
          <li className="menu-item">Cream Soup<span className="price">$2.75</span></li>
        </ul>
      </div>
      <div className="category"><br></br>
        <h2 className="center-heading1">Salads</h2>
        <ul className="menu-list">
          <li className="menu-item">Garden Salad<span className="price">$2.50</span></li>
          <li className="menu-item">Caesar Salad<span className="price">$4.00</span></li>
          <li className="menu-item">Greek Salad<span className="price">$2.75</span></li>
          <li className="menu-item">Cobb Salad<span className="price">$6.00</span></li>
          <li className="menu-item">Caprese Salad<span className="price">$3.00</span></li>
        </ul>
      </div><div className="category"><br></br>
        <h2 className="center-heading1">Rices</h2>
        <ul className="menu-list">
          <li className="menu-item">Steamed Rice<span className="price">$3.00</span></li>
          <li className="menu-item">Fried Rice<span className="price">$2.50</span></li>
          <li className="menu-item">Vegetable Pilaf<span className="price">$5.00</span></li>
          <li className="menu-item">Coconut Rice<span className="price">$7.50</span></li>
          <li className="menu-item">Spanish Rice<span className="price">$4.75</span></li>
        </ul>
      </div>
      <div className="category"><br></br>
        <h2 className="center-heading1">Desserts</h2>
        <ul className="menu-list">
          <li className="menu-item">Ice Cream<span className="price">$4.00</span></li>
          <li className="menu-item">Fruit Platter<span className="price">$3.50</span></li>
          <li className="menu-item">Watalappan<span className="price">$3.00</span></li>
          <li className="menu-item">Cream Caramel<span className="price">$3.50</span></li>
          <li className="menu-item">Curd And Treacle<span className="price">$2.75</span></li>
        </ul>
      </div><br></br>
      </div>
      </div>
    </div>
  );
};

export default Menu;