import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useCategoryData } from "../../hooks/useCategoryData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import CategoryAPI from "../../api/CategoryAPI";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const { openAddCategoryModal, openEditCategoryModal, setSelectedCategory } =
    useCategoryStore((state) => ({
      openAddCategoryModal: state.openAddCategoryModal,
      openEditCategoryModal: state.openEditCategoryModal,
      setSelectedCategory: state.setSelectedCategory,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useCategoryData();

  // Delete mutation
  const { mutate } = useMutation(CategoryAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Category deleted successfully" });
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
  const handleEdit = (category) => {
    setSelectedCategory(category);
    openEditCategoryModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total categories
    const categories = data.data.categories;
    const categoryCount = categories.length;
    //
    const additionalInfo = `Total Categories: ${categoryCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "description"],
      data.data.categories,
      "categories-report"
    );
  };

  return (
    <div className="container mt-5">
      <AddCategoryModal />
      <EditCategoryModal />

      <h1 className="mb-5">Categories</h1>

      <Button variant="primary" className="m-1" onClick={openAddCategoryModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Category</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={["Name", "Description", "Actions"]}
          children={
            data &&
            data.data.categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(category._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(category)}
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
