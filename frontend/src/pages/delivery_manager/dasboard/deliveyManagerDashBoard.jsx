import React from "react";
import { useRiderCount } from "../../../hooks/useRiderData";
import { useCategoryCount } from "../../../hooks/useCategoryData";
import { useStockRequestCount } from "../../../hooks/useStockRequestData";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  
  // Get the data from the react-query hook
  const { data: riderData } = useRiderCount();
  const { data: categoryData } = useCategoryCount();
  const { data: stockRequestData } = useStockRequestCount();
  //
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
              <h5 className="card-title">📦 Total Deliveries</h5>
              <p className="card-text fs-4 fw-bold">
                {categoryData?.data?.categoryCount}
              </p>
            </div>
          </div>
        </div>
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💢 Total Order Requests</h5>
              <p className="card-text fs-4 fw-bold">
                {stockRequestData?.data?.stockRequestCount}
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
