import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSupplierStore } from "../../store/useSupplierStore";
import { useSupplierData } from "../../hooks/useSupplierData";
import { BootstrapModal } from "../../components";
import SupplierAPI from "../../api/SupplierAPI";
import { useState } from "react";
import { handleUpload } from "../../utils/HandleUpload";
import Toast from "../../utils/toast";
import { useCategoryData } from "../../hooks/useCategoryData";


const AddRoomReservations = () => {
  // Get the state and actions from the store
  const { isAddSupplierModalOpen, closeAddSupplierModal } = useSupplierStore(
    (state) => ({
      isAddSupplierModalOpen: state.isAddSupplierModalOpen,
      closeAddSupplierModal: state.closeAddSupplierModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useSupplierData();
  const { data: categories, refetch: refetchCategories } = useCategoryData();

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
  const { mutate } = useMutation(SupplierAPI.create, {
    onSuccess: () => {
      // reset the percent and image state
      setPercent(0);
      setImage("");
      // close the modal and refetch the data
      closeAddSupplierModal();
      refetch();
      Toast({ type: "success", message: "Supplier created successfully" });
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
      show={isAddSupplierModalOpen}
      handleClose={closeAddSupplierModal}
      title="Add Delivery Rider"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            className={`form-control ${errors.contact ? "is-invalid" : ""}`}
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
          {errors.contact && (
            <div className="invalid-feedback">{errors.contact.message}</div>
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
          <label htmlFor="image">Supplier Image</label>
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
            {categories &&
              categories.data.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
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

export default AddRoomReservations;