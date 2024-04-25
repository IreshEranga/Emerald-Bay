import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";

const Index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [customerCount, setCustomerCount] = useState(0);
  const [loyaltyCustomerCount, setLoyaltyCustomerCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of customers
        const customersResponse = await axios.get("http://localhost:8000/customer");
        const totalCustomers = customersResponse.data.length;
        setCustomerCount(totalCustomers);

        // Fetch total number of loyalty customers
        const loyaltyCustomersResponse = await axios.get("http://localhost:8000/loyaltycustomers");
        const totalLoyaltyCustomers = loyaltyCustomersResponse.data.length;
        setLoyaltyCustomerCount(totalLoyaltyCustomers);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      <div className="row">
        <div key={1} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title"> Total number of customers</h5>
              <p className="card-text fs-4 fw-bold">{customerCount}</p>
            </div>
          </div>
        </div>
        <div key={2} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">Total number of loyalty customers</h5>
              <p className="card-text fs-4 fw-bold">{loyaltyCustomerCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
