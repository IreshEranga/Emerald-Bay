import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useCategoryData } from "../../hooks/useCategoryData";
import { BootstrapModal } from "../../components";
import CategoryAPI from "../../api/CategoryAPI";
import Toast from "../../utils/toast";

const AddCategoryModal = () => {
  // Get the state and actions from the store
  const { isAddCategoryModalOpen, closeAddCategoryModal } = useCategoryStore(
    (state) => ({
      isAddCategoryModalOpen: state.isAddCategoryModalOpen,
      closeAddCategoryModal: state.closeAddCategoryModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useCategoryData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(CategoryAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddCategoryModal();
      refetch();
      Toast({ type: "success", message: "Category created successfully" });
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
      show={isAddCategoryModalOpen}
      handleClose={closeAddCategoryModal}
      title="Add Category"
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
            <small className="form-text text-danger">Description is required</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddCategoryModal;
