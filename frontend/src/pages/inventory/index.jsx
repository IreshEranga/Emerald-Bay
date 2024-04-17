import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useInventoryStore } from "../../store/useInventoryStore";
import { useInventoryData } from "../../hooks/useInventoryData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import InventoryAPI from "../../api/InventoryAPI";
import AddInventoryModal from "./AddInventoryModal";
import EditInventoryModal from "./EditInventoryModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const {
    openAddInventoryModal,
    openEditInventoryModal,
    setSelectedInventory,
  } = useInventoryStore((state) => ({
    openAddInventoryModal: state.openAddInventoryModal,
    openEditInventoryModal: state.openEditInventoryModal,
    setSelectedInventory: state.setSelectedInventory,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useInventoryData();

  // Delete mutation
  const { mutate } = useMutation(InventoryAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Inventory deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (inventory) => {
    setSelectedInventory(inventory);
    openEditInventoryModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total inventories
    const inventories = data.data.inventories;
    const inventoryCount = inventories.length;
    inventories.forEach((inventory) => {
      inventory.supplier = inventory.supplier.name;
    });
    //
    const additionalInfo = `Total Inventories: ${inventoryCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "description", "quantity", "supplier", "status"],
      data.data.inventories,
      "inventories-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddInventoryModal />
      <EditInventoryModal />

      <h1 className="mb-3">Inventory Items</h1>

      <Button variant="primary" className="m-1" onClick={openAddInventoryModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Inventory</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Name",
            "Description",
            "Quantity",
            "Supplier",
            "Status",
            "Actions",
          ]}
          children={
            data &&
            data.data.inventories.map((inventory) => (
              <tr key={inventory._id}>
                <td>{inventory.name}</td>
                <td>{inventory.description}</td>
                <td>{inventory.quantity}</td>
                <td>{inventory.supplier.name}</td>
                {/* show status in colored badge - green for In Stock, yellow for Low Stock and red for Out of Stock */}
                <td>
                  <span
                    className={`badge ${
                      inventory.status === "In Stock"
                        ? "bg-success"
                        : inventory.status === "Low Stock"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {inventory.status}
                  </span>
                </td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(inventory._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(inventory)}
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
