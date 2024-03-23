import React, { useState } from "react";
import EMERALDBAYLOGO from "../../../assets/EMERALDBAYLOGO.png";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore";
import Supplier from "../../supplier";
import Category from "../../category";
import StockRequest from "../../stock_request";
import Dashboard from "./Dashboard";
import FeedbackForm from "../../customer_affairs/feedbacklist";
//
const AdminSidebar = () => {
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
            <Dashboard />
          </>
        );
      case "Suppliers":
        return (
          <>
            <Supplier />
          </>
        );
      case "Categories":
        return (
          <>
            <Category />
          </>
        );
      case "StockRequest":
        return (
          <>
            <StockRequest />
          </>
        );
        case "CustomerAffairs":
          return (
            <>
              {/* <StockRequest /> */}
              <FeedbackForm />
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
              href="#suppliers"
              className={`nav-link ${
                activeContent === "Suppliers" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Suppliers")}
            >
              Supplier Management
            </a>
          </li>
          <li>
            <a
              href="#categories"
              className={`nav-link ${
                activeContent === "Categories" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Categories")}
            >
              Category Management
            </a>
          </li>
          <li>
            <a
              href="#stock-requests"
              className={`nav-link ${
                activeContent === "StockRequest" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("StockRequest")}
            >
              Stock Requests
            </a>
          </li>
          <li>
            <a
              href="#customer-affairs"
              className={`nav-link ${
                activeContent === "CustomerAffairs" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("CustomerAffairs")}
            >
              Customer Affairs
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
export default AdminSidebar;
