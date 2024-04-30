import React, { useState, useEffect } from "react";
import { useRiderCount } from "../../../hooks/useRiderData";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  
  // Get the data from the react-query hook
  const { data: riderData } = useRiderCount();

  const [completedOrderCount, setCompletedOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);

  const fetchOrderCounts = async () => {
    try {
      const responseCompleted = await fetch("/api/orders/completed/count");
      if (!responseCompleted.ok) {
        throw new Error("Network response was not ok for completed orders");
      }
      const completedData = await responseCompleted.json();
      setCompletedOrderCount(completedData.count);
    } catch (error) {
      console.error("Error fetching completed order count:", error);
    }

    try {
      const responsePending = await fetch("/api/orders/pending/count");
      if (!responsePending.ok) {
        throw new Error("Network response was not ok for pending orders");
      }
      const pendingData = await responsePending.json();
      setPendingOrderCount(pendingData.count);
    } catch (error) {
      console.error("Error fetching pending order count:", error);
    }
  };

  useEffect(() => {
    fetchOrderCounts();
  }, []);
  
  
  

  
  return (
    <div className="maincontainer" >
      <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">🚵 Total Riders</h5>
              <p className="card-text fs-4 fw-bold">
                {riderData?.data?.riderCount}
              </p>
            </div>
          </div>
        </div>
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📦 Total Completed Deliveries</h5>
              <p className="card-text fs-4 fw-bold">
                {completedOrderCount}
              </p>
            </div>
          </div>
        </div>
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💢 Total Pending Orders</h5>
              <p className="card-text fs-4 fw-bold">
                {pendingOrderCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default index;
