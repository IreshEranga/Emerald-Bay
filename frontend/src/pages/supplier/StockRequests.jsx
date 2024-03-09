import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useStockRequestStore } from "../../store/useStockRequestStore";
import { useStockRequestCountForUser } from "../../hooks/useStockRequestData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import SupplierAPI from "../../api/SupplierAPI";
import { BootstrapTable } from "../../components";
import { useAvailableStock } from "../../hooks/useSupplierData";
import { useEffect, useState } from "react";
import StockRequestAPI from "../../api/StockRequestAPI";

const StockRequests = () => {
  const [stock, setStock] = useState(0);

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
  const { data, refetch } = useStockRequestCountForUser();
  const { data: availableStock } = useAvailableStock();

  // Update available stock mutation
  const { mutate: updateSupplierStock } = useMutation(SupplierAPI.updateStock, {
    onSuccess: (res) => {
      Toast({ type: "success", message: res.data.message });
      refetch();
    },
    onError: (error) => {
      Toast({ type: "error", message: error.response.data.message });
    },
  });

  // Update stock request status mutation
  const { mutate: updateStockStatus } = useMutation(StockRequestAPI.update, {
    onSuccess: (res) => {
      Toast({ type: "success", message: res.data.message });
      refetch();
    },
    onError: (error) => {
      Toast({ type: "error", message: error.response.data.message });
    },
  });

  // Function to handle update stock
  const onUpdateStock = (updatedStock) => {
    confirmMessage("Are you sure?", "The stock will be updated.", () => {
      updateSupplierStock({ data: { stock: updatedStock } });
    });
  };

  // Function to handle change status
  const onStatusChange = (id, status) => {
    confirmMessage("Are you sure?", "The status will be updated.", () => {
      updateStockStatus({ id, data: { status } });
    });
  };

  useEffect(() => {
    if (availableStock) {
      setStock(availableStock.data.availableStock);
    }
  }, [availableStock]);

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-5">
        <h1 className="me-3">Available Stock:</h1>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="form-control"
          style={{ width: "100px" }}
        />
        <Button
          className="ms-3"
          variant="primary"
          onClick={() => onUpdateStock(stock)}
        >
          Update
        </Button>
      </div>

      <hr />

      <h1 className="mb-5">Stock Requests</h1>
      <div className="mt-5">
        <BootstrapTable
          headers={["Hotel Name", "Quantity", "Status", "Actions"]}
          children={
            data &&
            data.data.stockRequests.map((stockRequest) => (
              <tr key={stockRequest._id}>
                <td>Emerald Bay</td>
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
                    variant="success"
                    onClick={() => onStatusChange(stockRequest._id, "APPROVED")}
                    size="sm"
                  >
                    Approve
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onStatusChange(stockRequest._id, "REJECTED")}
                    size="sm"
                  >
                    Reject
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

export default StockRequests;
