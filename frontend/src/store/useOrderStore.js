import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  orders: [],
  selectedOrders: null,
  isEditOrdersOpen: false,
};

const store = (set) => ({
  ...initialState,
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (order) =>
    set({ selectedOrder: order }),
  openEditOrders: () => set({ isEditOrdersOpen: true }),
  closeEditOrders: () => set({ isEditOrdersOpen: false }),
});

export const useOrderStore = create(
  devtools(store, "orderStore")
);
