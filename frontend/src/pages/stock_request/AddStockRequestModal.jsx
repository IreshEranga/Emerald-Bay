import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useStockRequestStore } from "../../store/useStockRequestStore";
import { useStockRequestData } from "../../hooks/useStockRequestData";
import { BootstrapModal } from "../../components";
import StockRequestAPI from "../../api/StockRequestAPI";
import Toast from "../../utils/toast";
import { useSupplierData } from "../../hooks/useSupplierData";

const AddStockRequestModal = () => {
  // Get the state and actions from the store
  const { isAddStockRequestModalOpen, closeAddStockRequestModal } =
    useStockRequestStore((state) => ({
      isAddStockRequestModalOpen: state.isAddStockRequestModalOpen,
      closeAddStockRequestModal: state.closeAddStockRequestModal,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useStockRequestData();
  const { data: supplierData, refetch: refetchSuppliers } = useSupplierData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(StockRequestAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddStockRequestModal();
      refetch();
      Toast({ type: "success", message: "StockRequest created successfully" });
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
      show={isAddStockRequestModalOpen}
      handleClose={closeAddStockRequestModal}
      title="Add StockRequest"
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
            <option value="">Select Supplier</option>
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
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddStockRequestModal;
