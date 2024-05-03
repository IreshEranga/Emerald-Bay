import React, { useState } from "react";
import EMERALDBAYLOGO from "../../../assets/EMERALDBAYLOGO.png";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore";
import OrderManagerDashBoard from "./OrderManagerDashBoard.jsx";
import Menu_Items from "./Menu.js";
import Orders from "./orders.jsx";


//
const OrderManagerSideBar = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  //
  const handleLinkClick = (content) => {
    setActiveContent(content);
  };
  //
  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));
  //
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <>
            <OrderManagerDashBoard />
          </>
        );
      case "Menu":
        return (
          <>
            <Menu_Items />
          </>
        );
      case "Orders":
        return (
          <>
            <Orders />
          </>
        );
      
      case "Account":
        return <p>This is the Account page content.</p>;
      default:
        return (
          <p>
            Welcome to the application. Please select a link from the sidebar.
          </p>
        );
    }
  };

  // Function to handle logout logic
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  //
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "280px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            src={EMERALDBAYLOGO}
            alt="Emerald Bay"
            style={{ maxWidth: "100%", maxHeight: "60px" }}
          />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="#dashboard"
              className={`nav-link ${
                activeContent === "Dashboard" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#menu"
              className={`nav-link ${
                activeContent === "Menu" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Menu")}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#orders"
              className={`nav-link ${
                activeContent === "Orders" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Orders")}
            >
              Orders
            </a>
          </li>
          
        </ul>
        <div className="mt-auto">
          <button
            className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FiLogOut className="me-2" /> Logout
          </button>
        </div>
      </div>
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
};
//
export default OrderManagerSideBar;
