import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useInventoryStore } from "../../store/useInventoryStore";
import { useInventoryData } from "../../hooks/useInventoryData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import InventoryAPI from "../../api/InventoryAPI";
import { useSupplierData } from "../../hooks/useSupplierData";

const EditInventoryModal = () => {
  // Get the state and actions from the store
  const {
    isEditInventoryModalOpen,
    closeEditInventoryModal,
    selectedInventory,
  } = useInventoryStore((state) => ({
    isEditInventoryModalOpen: state.isEditInventoryModalOpen,
    closeEditInventoryModal: state.closeEditInventoryModal,
    selectedInventory: state.selectedInventory,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useInventoryData();
  const { data: suppliers } = useSupplierData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(InventoryAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditInventoryModal();
      Toast({ type: "success", message: "Inventory updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedInventory._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedInventory changes
    if (selectedInventory) {
      setValue("name", selectedInventory.name);
      setValue("description", selectedInventory.description);
      setValue("quantity", selectedInventory.quantity);
      setValue("supplier", selectedInventory.supplier._id);
      setValue("status", selectedInventory.status);
    }
  }, [selectedInventory, setValue]);

  return (
    <BootstrapModal
      show={isEditInventoryModalOpen}
      handleClose={closeEditInventoryModal}
      title={`Edit Inventory: ${selectedInventory?.name}`}
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
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

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
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

        <div className="mb-3">
          <label htmlFor="supplier" className="form-label">
            Supplier
          </label>
          <select
            className="form-control"
            id="supplier"
            name="supplier"
            {...register("supplier", { required: true })}
          >
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

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-control"
            id="status"
            name="status"
            {...register("status", { required: true })}
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          {errors.status && (
            <small className="form-text text-danger">Status is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditInventoryModal;
