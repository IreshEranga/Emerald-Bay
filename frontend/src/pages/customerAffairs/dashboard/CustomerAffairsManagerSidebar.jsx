import React, { useState } from "react";
import EMERALDBAYLOGO from "../../../assets/EMERALDBAYLOGO.png";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore";
import CustomerAffairsManagerDashboard from "./CustomerAffairsManagerDashboard";
import FeedbackComponent from "./FeedbackComponent";
import FAQComponent from "./FAQComponent";


//
const CustomerAffairsManagerSideBar = () => {
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
            <CustomerAffairsManagerDashboard />
          </>
        );
      case "Feedback":
        return (
          <>
            <FeedbackComponent />
          </>
        );
      case "FAQ":
        return (
          <>
            <FAQComponent />
          </>
        );
      
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
            style={{ maxWidth: "100%", maxHeight: "100px" }}
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
              href="#feedback"
              className={`nav-link ${
                activeContent === "Feedback" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Feedback")}
            >
              Feedback
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className={`nav-link ${
                activeContent === "FAQ" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("FAQ")}
            >
              FAQ
            </a>
          </li>
          <li>
            {/* <a
              href="#contact"
              className={`nav-link ${
                activeContent === "Contact_Us" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Contact_Us")}
            >
              Contact Us
            </a> */}
          </li>
          <li>
            {/* <a
              href="#rating"
              className={`nav-link ${
                activeContent === "Rating_And_Review" ? "active" : "link-dark"
              }`}
              onClick={() => handleLinkClick("Rating_And_Review")}
            >
              Rating and Review
            </a> */}
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

export default CustomerAffairsManagerSideBar;
