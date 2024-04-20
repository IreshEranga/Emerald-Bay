import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAttendanceStore } from "../../store/useAttendanceStore";
import { useAttendanceData } from "../../hooks/useAttendanceData";
import { BootstrapModal } from "../../components";
import AttendanceAPI from "../../api/AttendanceAPI";
import Toast from "../../utils/toast";

const AddAttendanceModal = () => {
  const { isAddAttendanceModalOpen, closeAddAttendanceModal } = useAttendanceStore((state) => ({
    isAddAttendanceModalOpen: state.isAddAttendanceModalOpen,
    closeAddAttendanceModal: state.closeAddAttendanceModal,
  }));

  const { refetch } = useAttendanceData();

  const { handleSubmit, register, formState: { errors }, reset } = useForm();

  const onSubmit = (values) => {
    AttendanceAPI.create(values)
      .then(() => {
        closeAddAttendanceModal();
        refetch();
        Toast({ type: "success", message: "Attendance created successfully" });
      })
      .catch((error) => {
        Toast({ type: "error", message: error.message });
      });
  };

  return (
    <BootstrapModal
      show={isAddAttendanceModalOpen}
      handleClose={closeAddAttendanceModal}
      title="Add Attendance "
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="employeeid">Employee ID</label>
          <input
            type="text"
            className="form-control"
            id="EmpID"
            name="EmpID"
            {...register("EmpID", { required: true })}
          />
          {errors.EmpID && (
            <small className="form-text text-danger">Employee ID is required</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
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

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            {...register("address", { required: true })}
          ></textarea>
          {errors.address && (
            <small className="form-text text-danger">Address is required</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            {...register("date", { required: true })}
          />
          {errors.date && (
            <small className="form-text text-danger">Date is required</small>
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
            <option value="CHEF">Chef</option>
            <option value="WAITER">Waiter</option>
            <option value="ADMIN">Admin</option>
            <option value="DELIVERY_RIDER">Delivery Rider</option>
          </select>
          {errors.role && (
            <small className="form-text text-danger">Role is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddAttendanceModal;
