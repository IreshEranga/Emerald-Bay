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
    </div>
  );
};

export default index;
