import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useCategoryData } from "../../hooks/useCategoryData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import CategoryAPI from "../../api/CategoryAPI";

const EditCategoryModal = () => {
  // Get the state and actions from the store
  const { isEditCategoryModalOpen, closeEditCategoryModal, selectedCategory } =
    useCategoryStore((state) => ({
      isEditCategoryModalOpen: state.isEditCategoryModalOpen,
      closeEditCategoryModal: state.closeEditCategoryModal,
      selectedCategory: state.selectedCategory,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useCategoryData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(CategoryAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditCategoryModal();
      Toast({ type: "success", message: "Category updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedCategory._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedCategory changes
    if (selectedCategory) {
      setValue("name", selectedCategory.name);
      setValue("description", selectedCategory.description);
    }
  }, [selectedCategory, setValue]);

  return (
    <BootstrapModal
      show={isEditCategoryModalOpen}
      handleClose={closeEditCategoryModal}
      title={`Edit Category: ${selectedCategory?.name}`}
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
            <small className="form-text text-danger">Description is required</small>
          )}
        </div>
        <hr />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditCategoryModal;
