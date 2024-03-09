import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  categories: [],
  selectedCategory: null,
  isAddCategoryModalOpen: false,
  isEditCategoryModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setCategorys: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  openAddCategoryModal: () => set({ isAddCategoryModalOpen: true }),
  closeAddCategoryModal: () => set({ isAddCategoryModalOpen: false }),
  openEditCategoryModal: () => set({ isEditCategoryModalOpen: true }),
  closeEditCategoryModal: () => set({ isEditCategoryModalOpen: false }),
});

export const useCategoryStore = create(devtools(store, "categoryStore"));
