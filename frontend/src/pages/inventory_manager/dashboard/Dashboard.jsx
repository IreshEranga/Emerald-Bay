import React from "react";
import { useInventoryCount } from "../../../hooks/useInventoryData";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: inventoryData } = useInventoryCount();
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
              <h5 className="card-title">📦 Total Inventory Items</h5>
              <p className="card-text fs-4 fw-bold">
                {inventoryData?.data?.inventoryCount || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
