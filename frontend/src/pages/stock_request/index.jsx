import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useStockRequestStore } from "../../store/useStockRequestStore";
import { useStockRequestData } from "../../hooks/useStockRequestData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import StockRequestAPI from "../../api/StockRequestAPI";
import AddStockRequestModal from "./AddStockRequestModal";
import EditStockRequestModal from "./EditStockRequestModal";
import { BootstrapTable } from "../../components";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const {
    openAddStockRequestModal,
    openEditStockRequestModal,
    setSelectedStockRequest,
  } = useStockRequestStore((state) => ({
    openAddStockRequestModal: state.openAddStockRequestModal,
    openEditStockRequestModal: state.openEditStockRequestModal,
    setSelectedStockRequest: state.setSelectedStockRequest,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useStockRequestData();

  // Delete mutation
  const { mutate } = useMutation(StockRequestAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "StockRequest deleted successfully" });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (stockRequest) => {
    setSelectedStockRequest(stockRequest);
    openEditStockRequestModal();
  };

  return (
    <div className="container mt-5">
      <AddStockRequestModal />
      <EditStockRequestModal />

      <h1 className="mb-5">Stock Requests</h1>

      <Button
        variant="primary"
        className="m-1"
        onClick={openAddStockRequestModal}
      >
        <IoMdAddCircleOutline className="mb-1" /> <span>Add StockRequest</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={["Supplier", "Quantity", "Status", "Actions"]}
          children={
            data &&
            data.data.stockRequests.map((stockRequest) => (
              <tr key={stockRequest._id}>
                <td>{stockRequest.supplier.name}</td>
                <td>{stockRequest.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      stockRequest.status === "PENDING"
                        ? "bg-warning"
                        : stockRequest.status === "APPROVED"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {stockRequest.status}
                  </span>
                </td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(stockRequest._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(stockRequest)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                    <span>Edit</span>
                  </Button>
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;
