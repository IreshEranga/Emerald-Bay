import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import EmployeeAPI from "../../api/EmployeeAPI";
import { handleUpload } from "../../utils/HandleUpload";

const EditEmployeeModal = () => {
  // Get the state and actions from the store
  const { isEditEmployeeModalOpen, closeEditEmployeeModal, selectedEmployee} =
    useEmployeeStore((state) => ({
      isEditEmployeeModalOpen: state.isEditEmployeeModalOpen,
      closeEditEmployeeModal: state.closeEditEmployeeModal,
      selectedEmployee: state.selectedEmployee,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useEmployeeData();
 

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
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

  // Update mutation
  const { mutate } = useMutation(EmployeeAPI.update, {
    onSuccess: () => {
      // reset the percent and image state
      setPercent(0);
      setImage("");
      // close the modal and refetch the data
      refetch();
      closeEditEmployeeModal();
      Toast({ type: "success", message: "Employee updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    if (image) {
      data.image = image;
    }
    //
    mutate({ id: selectedEmployee._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedSupplier changes
    if (selectedEmployee) {
      setValue("name", selectedEmployee.name);
      setValue("address", selectedEmployee.address);
      setValue("contact", selectedEmployee.phone);
      setValue("email", selectedEmployee.email);
      setValue("salary", selectedEmployee.salary);
      setValue("jobRole", selectedEmployee.role);
      
    }
  }, [selectedEmployee, setValue]);

  const phoneNumberPattern =
    /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return (
    <BootstrapModal
      show={isEditEmployeeModalOpen}
      handleClose={closeEditEmployeeModal}
      title={`Edit Employee: ${selectedEmployee?.name}`}
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
          <label htmlFor="address" className="form-label">
            Address
          </label>
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
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="contact"
            name="contact"
            {...register("contact", {
              required: "Phone number is required",
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

        <hr />

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Current Image
          </label>
          <br />
          <img
            src={selectedEmployee?.image}
            alt={selectedEmployee?.name}
            width="50"
            height="50"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="image">New Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload image"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={!file || percent === 100}
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


        <hr />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditEmployeeModal;
