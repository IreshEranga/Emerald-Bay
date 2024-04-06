import React from "react";
/*import { useVIPRoomReservationCount } from "../../../hooks/useVIPRoomReservationData";*/ // Import custom hook for VIP room reservation count
import { useAuthStore } from "../../../store/useAuthStore";


const ReservationManagerDashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  
  //Get the count of VIP room reservations
  /*const { data: vipRoomReservationData } = useVIPRoomReservationCount();*/

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
              <h5 className="card-title">🛎 Total Table Reservations</h5>
              <p className="card-text fs-4 fw-bold">
                {/* Display table reservation count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">👑 Total VIP Room Reservations</h5>
              <p className="card-text fs-4 fw-bold">
                 {/* Display VIP room reservation count */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">🎊 Total Events</h5>
              <p className="card-text fs-4 fw-bold">
                {/* Display events count */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagerDashboard;