import React, { useState, useEffect } from "react";
import { useRiderCount, useRiderData } from "../../../hooks/useRiderData";
import { useAuthStore } from "../../../store/useAuthStore";
import Chart from "chart.js/auto";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  
  // Get the data from the react-query hook
  const { data: riderData } = useRiderCount();
  const { data: riderDetails, refetch: refetchRiderData } = useRiderData();

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
  
  
  // Create a chart after fetching data
  /*useEffect(() => {
    if (data && data.data.riders) {
      const ctx = document.getElementById("riderChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data && data.data.riders.map((rider) => rider.name),
          datasets: [
            {
              label: "Rides",
              data: data && data.data.riders.map((rider) => rider.rides),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [riderData]);*/

  useEffect(() => {
    if (riderDetails) {
      // Process rider data here
      console.log("Rider data:", riderDetails);
      createChart(riderDetails.data.riders);
    }
  }, [riderDetails]);

  const createChart = (riders) => {
    const riderNames = riders.map((rider) => rider.name);
    const rideCounts = riders.map((rider) => rider.rides);

    const existingChart = Chart.getChart("riderChart");
  if (existingChart) {
    existingChart.destroy(); // Destroy existing chart if it exists
  }

    const ctx = document.getElementById("riderChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: riderNames,
        datasets: [
          {
            label: "Rides",
            data: rideCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0, // Minimum value for y-axis ticks
            suggestedMax: Math.ceil(Math.max(...rideCounts)+1), // Maximum value for y-axis ticks (rounded up)
            precision: 0, // Number of decimal places for tick values (0 for integers)
          },
        },
      },
    });
  };


  
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
        <div className="col-md-12 mb-4" style={{marginTop:'50px', border:'1px solid black'}}>
            <canvas id="riderChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
    </div>
  );
};

export default index;
