import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import { BootstrapModal } from "../../components";
import EmployeeAPI from "../../api/EmployeeAPI";
import { useState } from "react";
import { handleUpload } from "../../utils/HandleUpload";
import Toast from "../../utils/toast";


const AddEmployeeModal = () => {
  // Get the state and actions from the store
  const { isAddEmployeeModalOpen, closeAddEmployeeModal } = useEmployeeStore(
    (state) => ({
      isAddEmployeeModalOpen: state.isAddEmployeeModalOpen,
      closeAddEmployeeModal: state.closeAddEmployeeModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useEmployeeData();
  //const { data: categories, refetch: refetchCategories } = useCategoryData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  // Handle image upload
  const handleImageUpload = (e) => {
    // const file = e.target.files[0];
    setFile(file);
    handleUpload({ file, setPercent, setImage });
  };

  // Handle change
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  // Create mutation
  const { mutate } = useMutation(EmployeeAPI.create, {
    onSuccess: () => {
      // reset the percent and image state
      setPercent(0);
      setImage("");
      // close the modal and refetch the data
      closeAddEmployeeModal();
      refetch();
      Toast({ type: "success", message: "Employee created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    values.image = image;
    console.log(values);
    mutate(values);
    reset();
    // reset the percent and image state
    setPercent(0);
    setImage("");
  };

  const phoneNumberPattern =
    /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return (
    <BootstrapModal
      show={isAddEmployeeModalOpen}
      handleClose={closeAddEmployeeModal}
      title="Add Employee "
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">

        <label htmlFor="employeeid">Employee ID</label>
          <input
            type="text"
            className="form-control"
            id="employeeid"
            name="employeeid"
            {...register("employeeid", { required: true })}
          />
          {errors.employeeid && (
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
          <label htmlFor="phone">Contact Number</label>
          <input
            type="text"
            className={`form-control ${errors.contact ? "is-invalid" : ""}`}
            id="phone"
            name="phone"
            {...register("phone", {
              required: "phone number is required",
              pattern: {
                value: phoneNumberPattern,
                message: "Invalid phone number format",
              },
            })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
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

        <div className="form-group mb-3">
          <label htmlFor="image">Employee Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload image"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={!file || percent === 100}
            // add suitable color to the button
            className="btn btn-outline-dark mt-2 btn-sm"
          >
            Upload
          </button>
          <div className="progress mt-2">
            <div
              className={`progress-bar bg-success ${
                percent < 100
                  ? "progress-bar-animated progress-bar-striped"
                  : ""
              }`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent < 100 ? `Uploading ${percent}%` : `Uploaded ${percent}%`}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="salary"
            className="form-control"
            id="salary"
            name="salary"
            {...register("salary", { required: true })}
          />
          {errors.salary && (
            <small className="form-text text-danger">Salary is required</small>
          )}
        </div>

        {/* Category Select Dropdown */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            
                <option key="CHEF" value="CHEF">Chef</option>
                <option key="WAITER" value="WAITER">Waiter</option>
                
                
          </select>
          {errors.category && (
            <small className="form-text text-danger">Category is required</small>
          )}
        </div>

        

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={!image}
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddEmployeeModal;
