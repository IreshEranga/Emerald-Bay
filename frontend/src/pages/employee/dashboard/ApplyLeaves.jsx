import React from 'react';
import { BootstrapModal } from '../../../components';
import { useLeavesStore } from "../../../store/useLeavesStore";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import leavesAPI from '../../../api/leavesAPI';
import Toast from '../../../utils/toast';
import { useEmployee } from "../../../hooks/useEmployeeData";
import { useAuthStore } from "../../../store/useAuthStore";

const  ApplyLeaves = (req, res, nxt) => {
  // Get the state and actions from the store
  const { isApplyLeavesOpen, closeApplyLeaves } = useLeavesStore();

  const { user } = useAuthStore();
  const { data: employee, refetch } = useEmployee(user && user._id);

  

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(leavesAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeApplyLeaves();
      // refetch(); // Assuming useLeaves hook is not needed
      Toast({ type: "success", message: "Leaves created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isApplyLeavesOpen}
      handleClose={closeApplyLeaves}
      title="Add Leaves Request"
    >  
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Emp ID */}
       
      
        <div className="form-group">
          <label htmlFor="EmpID">Emp ID</label>
          <input
            type="text"
            className="form-control"
            id="EmpID"
            value = {employee && employee.data && employee.data.employee && employee.data.employee.employeeid}
            readOnly
            {...register("EmpID", { required: true })}
          />
          {errors.EmpID && (
            <small className="form-text text-danger">
              Employee ID is required
            </small>
          )}
        </div>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value = {employee && employee.data && employee.data.employee && employee.data.employee.name}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>
        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          {/* <select
            className="form-select"
            id="role"
            value = {employee && employee.data && employee.data.employee && employee.data.employee.role}
            {...register("role", { required: true })}
          >
            <option value="">Select Role</option>
            <option value="chef">Chef</option>
            <option value="delivery rider">Delivery Rider</option>
            <option value="admin">Admin</option>
            <option value="waiter">Waiter</option>
          </select> */}
          <input
          type="text"
          className="form-control"
          id="role"
          value = {employee && employee.data && employee.data.employee && employee.data.employee.category}
          {...register("role", { required: true })}
          />
          
          {errors.role && (
            <small className="form-text text-danger">Role is required</small>
          )}
        </div>
        {/* Leave Type */}
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type</label>
          {/* <select
            className="form-select"
            id="leaveType"
            value = {employee && employee.data && employee.data.employee && employee.data.employee.leaveType}
            {...register("leaveType", { required: true })}
          >
            <option value="">Select Leave Type</option>
            <option value="sick leave">Sick Leave</option>
            <option value="casual leave">Casual Leave</option>
            <option value="annual leave">Annual Leave</option>
          </select> */}
            <input
          type="text"
          className="form-control"
          id="leaveType"
          value = {employee && employee.data && employee.data.employee && employee.data.employee.leaveType}
          {...register("leaveType", { required: true })}
          />
          {errors.leaveType && (
            <small className="form-text text-danger">Leave Type is required</small>
          )}
        </div>
        {/* Leave From */}
         <div className="form-group">
          <label htmlFor="leaveFrom">Leave From</label>
          <input
            type="date"
            className="form-control"
            id="leaveFrom"
            value = {employee && employee.data && employee.data.employee && employee.data.employee.leaveFrom}
            {...register("leaveFrom", { required: true })}
          />
          {errors.leaveFrom && (
            <small className="form-text text-danger">Leave From date is required</small>
          )}
        </div> 
            
        {/* Leave To */}
        <div className="form-group">
          <label htmlFor="leaveTo">Leave To</label>
          <input
            type="date"
            className="form-control"
            id="leaveTo"
            value = {employee && employee.data && employee.data.employee && employee.data.employee.leaveTo}
            {...register("leaveTo", { required: true })}
          />
          {errors.leaveTo && (
            <small className="form-text text-danger">Leave To date is required</small>
          )}
        </div>
     
        
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default ApplyLeaves;
