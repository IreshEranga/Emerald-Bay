import React from "react";
import { useSupplierCount } from "../../../hooks/useSupplierData";
import { useCategoryCount } from "../../../hooks/useCategoryData";
import { useStockRequestCount } from "../../../hooks/useStockRequestData";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: supplierData } = useSupplierCount();
  const { data: categoryData } = useCategoryCount();
  const { data: stockRequestData } = useStockRequestCount();
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
              <h5 className="card-title">🏢 Total Feedbacks</h5>
              <p className="card-text fs-4 fw-bold">
                {supplierData?.data?.supplierCount}
              </p>
            </div>
          </div>
        </div>
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📦 Total Categories</h5>
              <p className="card-text fs-4 fw-bold">
                {categoryData?.data?.categoryCount}
              </p>
            </div>
          </div>
        </div>
        <div key={index} className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💢 Total Stock Requests</h5>
              <p className="card-text fs-4 fw-bold">
                {stockRequestData?.data?.stockRequestCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
