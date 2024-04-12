import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";


const CustomerAffairsManagerDashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  const [tableReservationsCount, setTableReservationsCount] = useState(0);
  const [vipRoomReservationsCount, setVIPRoomReservationsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);

  useEffect(() => {
    // Fetch count of all table reservations
    const fetchTableReservationsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tableReservation/count");
        setTableReservationsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching table reservations count:", error);
      }
    };

    fetchTableReservationsCount();

  // Fetch count of all vip room reservations
  const fetchVIPRoomReservationsCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vipRoomReservation/count");
      setVIPRoomReservationsCount(response.data.count);
    } catch (error) {
      console.error("Error fetching vip room reservations count:", error);
    }
  };

  fetchVIPRoomReservationsCount();

  // Fetch count of all events
  const fetchEventsCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/event/count");
      setEventsCount(response.data.count);
    } catch (error) {
      console.error("Error fetching events count:", error);
    }
  };

  fetchEventsCount();

}, []);

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📝 Feedback</h5>
              <p className="card-text fs-4 fw-bold">
                {tableReservationsCount}  {/* Display table reservations count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📖 FAQ</h5>
              <p className="card-text fs-4 fw-bold">
                 {vipRoomReservationsCount} {/* Display VIP room reservations count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📞 Contact Us</h5>
              <p className="card-text fs-4 fw-bold">
                 {eventsCount}  {/* Display events count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">⭐ Rating and Review</h5>
              <p className="card-text fs-4 fw-bold">
                 {eventsCount}  {/* Display events count */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CustomerAffairsManagerDashboard;