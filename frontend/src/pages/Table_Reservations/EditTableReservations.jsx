import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSupplierStore } from "../../store/useSupplierStore";
import { useSupplierData } from "../../hooks/useSupplierData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import SupplierAPI from "../../api/SupplierAPI";
import { handleUpload } from "../../utils/HandleUpload";
import { useCategoryData } from "../../hooks/useCategoryData";


const EditTableReservations = () => {
  // Get the state and actions from the store
  const { isEditSupplierModalOpen, closeEditSupplierModal, selectedSupplier } =
    useSupplierStore((state) => ({
      isEditSupplierModalOpen: state.isEditSupplierModalOpen,
      closeEditSupplierModal: state.closeEditSupplierModal,
      selectedSupplier: state.selectedSupplier,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useSupplierData();
  const { data: categories, refetch: refetchCategories } = useCategoryData();

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
  const { mutate } = useMutation(SupplierAPI.update, {
    onSuccess: () => {
      // reset the percent and image state
      setPercent(0);
      setImage("");
      // close the modal and refetch the data
      refetch();
      closeEditSupplierModal();
      Toast({ type: "success", message: "Supplier updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    if (image) {
      data.image = image;
    }
    //
    mutate({ id: selectedSupplier._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedSupplier changes
    if (selectedSupplier) {
      setValue("name", selectedSupplier.name);
      setValue("address", selectedSupplier.address);
      setValue("contact", selectedSupplier.contact);
      setValue("email", selectedSupplier.email);
      setValue("category", selectedSupplier.category._id);
    }
  }, [selectedSupplier, setValue]);

  const phoneNumberPattern =
    /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return (
    <BootstrapModal
      show={isEditSupplierModalOpen}
      handleClose={closeEditSupplierModal}
      title={`Edit Supplier: ${selectedSupplier?.name}`}
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
            src={selectedSupplier?.image}
            alt={selectedSupplier?.name}
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

        {/* Category Select Dropdown */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            {...register("category", { required: true })}
          >
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

        <hr />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditTableReservations;