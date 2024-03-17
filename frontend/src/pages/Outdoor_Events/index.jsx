import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useSupplierStore } from "../../store/useSupplierStore";
import { useSupplierData } from "../../hooks/useSupplierData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import SupplierAPI from "../../api/SupplierAPI";
import { BootstrapTable } from "../../components";
import { BsCircle } from "react-icons/bs";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";


const index = () => {
  // Get the state and actions from the store
  const { openAddSupplierModal, openEditSupplierModal, setSelectedSupplier } =
    useSupplierStore((state) => ({
      openAddSupplierModal: state.openAddSupplierModal,
      openEditSupplierModal: state.openEditSupplierModal,
      setSelectedSupplier: state.setSelectedSupplier,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useSupplierData();

  // Delete mutation
  const { mutate } = useMutation(SupplierAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Supplier deleted successfully" });
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
  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    openEditSupplierModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total suppliers
    const suppliers = data.data.suppliers;
    const supplierCount = suppliers.length;
    //
    const additionalInfo = `Total Suppliers: ${supplierCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "address", "contact", "email"],
      data.data.suppliers,
      "suppliers-report"
    );
  };

  return (
    <div className="container mt-5">
      <AddEvent />
      <EditEvent />

      <h1 className="mb-5">Outdoor Events</h1>

      <Button variant="primary" className="m-1" onClick={openAddSupplierModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Outdoor Event</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Image",
            "Name",
            "Contact",
            "Email",
            "Date",
            "Time",
            "Actions",
          ]}
          children={
            data &&
            data.data.suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>
                  {supplier.image ? (
                    <img
                      src={supplier.image}
                      alt={supplier.name}
                      width="50"
                      height="50"
                    />
                  ) : (
                    <BsCircle size={30} />
                  )}
                </td>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.email}</td>
                <td>{supplier.date}</td>
                <td>{supplier.time}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(supplier._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(supplier)}
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