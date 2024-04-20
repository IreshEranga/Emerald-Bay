import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  employees: [],
  selectedEmployee: null,
  isAddEmployeeModalOpen: false,
  isEditEmployeeModalOpen: false,
 
};

const store = (set) => ({
  ...initialState,
  setEmployees: (employees) => set({ employees }),
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  openAddEmployeeModal: () => set({ isAddEmployeeModalOpen: true }),
  closeAddEmployeeModal: () => set({ isAddEmployeeModalOpen: false }),
  openEditEmployeeModal: () => set({ isEditEmployeeModalOpen: true }),
  closeEditEmployeeModal: () => set({ isEditEmployeeModalOpen: false }),
  
});

export const useEmployeeStore = create(devtools(store, "employeeStore"));
