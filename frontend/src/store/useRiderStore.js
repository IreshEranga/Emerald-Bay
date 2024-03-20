import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  riders: [],
  selectedRider: null,
  isAddDeliveryRiderModalOpen: false,
  isEditDeliveryRiderModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setRiders: (riders) => set({ riders }),
  setSelectedRider: (rider) => set({ selectedRider: rider }),
  openAddDeliveryRiderModal: () => set({ isAddDeliveryRiderModalOpen: true }),
  closeAddDeliveryRiderModal: () => set({ isAddDeliveryRiderModalOpen: false }),
  openEditDeliveryRiderModal: () => set({ isEditDeliveryRiderModalOpen: true }),
  closeEditDeliveryRiderModal: () => set({ isEditDeliveryRiderModalOpen: false }),
});

export const useRiderStore = create(devtools(store, "riderStore"));
