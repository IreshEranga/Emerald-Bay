import React from "react";
import { useEmployeeCount } from "../../../hooks/useEmployeeData";
//import { useEmployeeStore } from "../../../store/useEmployeeStore";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: employeeData} = useEmployeeCount();
 

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
              <h5 className="card-title">🚵 Total Employees</h5>
              <p className="card-text fs-4 fw-bold">
                {employeeData?.data?.employeeCount}
              </p>
            </div>
          </div>
        </div>
       
        
      </div>
    </div>
  );
};

export default index;
