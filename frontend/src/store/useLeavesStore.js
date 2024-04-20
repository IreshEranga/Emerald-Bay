import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  leaves: [],
  selectedLeaves: null,
  isApplyLeavesOpen: false,
  isEditLeavesOpen: false,
};

const store = (set) => ({
  ...initialState,
  setLeaveManagement: (leaves) => set({ leaves }),
  setSelectedLeaves: (leaves) =>
    set({ selectedLeaves: leaves }),
    openApplyLeaves: () => set({ isApplyLeavesOpen: true }),
    closeApplyLeaves: () => set({ isApplyLeavesOpen: false }),
    openEditLeaves: () => set({ isEditLeavesOpen: true }),
    closeEditLeaves: () => set({ isEditLeavesOpen: false }),
}); 

export const useLeavesStore = create(
  devtools(store, "leavesStore")
);
