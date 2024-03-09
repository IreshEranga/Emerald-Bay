import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  stockRequests: [],
  selectedStockRequest: null,
  isAddStockRequestModalOpen: false,
  isEditStockRequestModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setStockRequests: (stockRequests) => set({ stockRequests }),
  setSelectedStockRequest: (stockRequest) =>
    set({ selectedStockRequest: stockRequest }),
  openAddStockRequestModal: () => set({ isAddStockRequestModalOpen: true }),
  closeAddStockRequestModal: () => set({ isAddStockRequestModalOpen: false }),
  openEditStockRequestModal: () => set({ isEditStockRequestModalOpen: true }),
  closeEditStockRequestModal: () => set({ isEditStockRequestModalOpen: false }),
});

export const useStockRequestStore = create(
  devtools(store, "stockRequestStore")
);
