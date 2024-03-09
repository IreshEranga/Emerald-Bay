import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  suppliers: [],
  selectedSupplier: null,
  isAddSupplierModalOpen: false,
  isEditSupplierModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setSuppliers: (suppliers) => set({ suppliers }),
  setSelectedSupplier: (supplier) => set({ selectedSupplier: supplier }),
  openAddSupplierModal: () => set({ isAddSupplierModalOpen: true }),
  closeAddSupplierModal: () => set({ isAddSupplierModalOpen: false }),
  openEditSupplierModal: () => set({ isEditSupplierModalOpen: true }),
  closeEditSupplierModal: () => set({ isEditSupplierModalOpen: false }),
});

export const useSupplierStore = create(devtools(store, "supplierStore"));
