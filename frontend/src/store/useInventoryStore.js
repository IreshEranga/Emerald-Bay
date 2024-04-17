import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  inventories: [],
  selectedInventory: null,
  isAddInventoryModalOpen: false,
  isEditInventoryModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setInventorys: (inventories) => set({ inventories }),
  setSelectedInventory: (inventory) => set({ selectedInventory: inventory }),
  openAddInventoryModal: () => set({ isAddInventoryModalOpen: true }),
  closeAddInventoryModal: () => set({ isAddInventoryModalOpen: false }),
  openEditInventoryModal: () => set({ isEditInventoryModalOpen: true }),
  closeEditInventoryModal: () => set({ isEditInventoryModalOpen: false }),
});

export const useInventoryStore = create(devtools(store, "inventoryStore"));
