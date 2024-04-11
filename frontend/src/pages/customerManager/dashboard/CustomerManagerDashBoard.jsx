import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of customers
        const customersResponse = await axios.get("http://localhost:8000/customer");
        const totalCustomers = customersResponse.data.length;
        setCustomerCount(totalCustomers);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //
  return (
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
              <h5 className="card-title"> Total number of customers</h5>
              <p className="card-text fs-4 fw-bold">
                {customerCount}
              </p>
            </div>
          </div>
        </div>
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">Total number of loyalty customers</h5>
              <p className="card-text fs-4 fw-bold">
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
