import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useStockRequestStore } from "../../store/useStockRequestStore";
import { useStockRequestData } from "../../hooks/useStockRequestData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import StockRequestAPI from "../../api/StockRequestAPI";
import { useSupplierData } from "../../hooks/useSupplierData";

const EditStockRequestModal = () => {
  // Get the state and actions from the store
  const {
    isEditStockRequestModalOpen,
    closeEditStockRequestModal,
    selectedStockRequest,
  } = useStockRequestStore((state) => ({
    isEditStockRequestModalOpen: state.isEditStockRequestModalOpen,
    closeEditStockRequestModal: state.closeEditStockRequestModal,
    selectedStockRequest: state.selectedStockRequest,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useStockRequestData();
  const { data: supplierData, refetch: refetchSuppliers } = useSupplierData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(StockRequestAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditStockRequestModal();
      Toast({ type: "success", message: "StockRequest updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedStockRequest._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedStockRequest changes
    if (selectedStockRequest) {
      setValue("supplier", selectedStockRequest.supplier._id);
      setValue("quantity", selectedStockRequest.quantity);
    }
  }, [selectedStockRequest, setValue]);

  return (
    <BootstrapModal
      show={isEditStockRequestModalOpen}
      handleClose={closeEditStockRequestModal}
      title={`Edit Stock Request: ${selectedStockRequest?.supplier?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Supplier Dropdown */}
        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <select
            className="form-select"
            id="supplier"
            name="supplier"
            {...register("supplier", { required: true })}
          >
            {supplierData?.data?.suppliers.map((supplier) => (
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
        {/* Quantity */}
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

        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditStockRequestModal;
