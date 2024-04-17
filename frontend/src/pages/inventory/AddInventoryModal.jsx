import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useInventoryStore } from "../../store/useInventoryStore";
import { useInventoryData } from "../../hooks/useInventoryData";
import { BootstrapModal } from "../../components";
import InventoryAPI from "../../api/InventoryAPI";
import Toast from "../../utils/toast";
import { useSupplierData } from "../../hooks/useSupplierData";

const AddInventoryModal = () => {
  // Get the state and actions from the store
  const { isAddInventoryModalOpen, closeAddInventoryModal } = useInventoryStore(
    (state) => ({
      isAddInventoryModalOpen: state.isAddInventoryModalOpen,
      closeAddInventoryModal: state.closeAddInventoryModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useInventoryData();
  const { data: suppliers } = useSupplierData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(InventoryAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddInventoryModal();
      refetch();
      Toast({ type: "success", message: "Inventory created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    // convert quantity to number
    values.quantity = Number(values.quantity);
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddInventoryModalOpen}
      handleClose={closeAddInventoryModal}
      title="Add Inventory Item"
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
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <small className="form-text text-danger">
              Quantity is required
            </small>
          )}
        </div>

        {/* suppliers dropdown */}
        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <select
            className="form-control"
            id="supplier"
            name="supplier"
            {...register("supplier", { required: true })}
          >
            <option value="">Select Supplier</option>
            {suppliers &&
              suppliers.data.suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
          </select>
          {errors.supplier && (
            <small className="form-text text-danger">
              Supplier is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            {...register("status", { required: true })}
          >
            <option value="">Select Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          {errors.status && (
            <small className="form-text text-danger">Status is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddInventoryModal;
