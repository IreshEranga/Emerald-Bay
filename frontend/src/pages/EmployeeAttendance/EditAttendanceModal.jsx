import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAttendanceStore } from "../../store/useAttendanceStore";
import { useAttendanceData } from "../../hooks/useAttendanceData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import AttendanceAPI from "../../api/AttendanceAPI";

const EditAttendanceModal = () => {
  const { isEditAttendanceModalOpen, closeEditAttendanceModal, selectedAttendance } = useAttendanceStore((state) => ({
    isEditAttendanceModalOpen: state.isEditAttendanceModalOpen,
    closeEditAttendanceModal: state.closeEditAttendanceModal,
    selectedAttendance: state.selectedAttendance,
  }));

  const { refetch } = useAttendanceData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await AttendanceAPI.update({ id: selectedAttendance._id, data }); // Fix: Pass an object containing id and data
      closeEditAttendanceModal();
      refetch();
      Toast({ type: "success", message: "Attendance updated successfully" });
    } catch (error) {
      Toast({ type: "error", message: error.message });
    }
  };

  useEffect(() => {
    if (selectedAttendance) {
      setValue("name", selectedAttendance.name);
      setValue("email", selectedAttendance.email);
      setValue("role", selectedAttendance.role);
    }
  }, [selectedAttendance, setValue]);

  return (
    <BootstrapModal
      show={isEditAttendanceModalOpen}
      handleClose={closeEditAttendanceModal}
      title={`Edit Attendance: ${selectedAttendance?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="form-text text-danger">Email is required</small>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            {...register("role", { required: true })}
          >
            <option value="">Select Role</option>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
            <option value="Admin">Admin</option>
            <option value="Delivery Ride">Delivery Ride</option>
          </select>
          {errors.role && (
            <small className="form-text text-danger">Role is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditAttendanceModal;
