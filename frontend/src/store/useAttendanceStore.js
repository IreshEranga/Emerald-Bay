import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  attendees: [],
  selectedAttendance: null,
  isAddAttendanceModalOpen: false,
  isEditAttendanceModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setAttendees: (attendees) => set({ attendees }),
  setSelectedAttendance: (attendance) => set({ selectedAttendance: attendance }),
  openAddAttendanceModal: () => set({ isAddAttendanceModalOpen: true }),
  closeAddAttendanceModal: () => set({ isAddAttendanceModalOpen: false }),
  openEditAttendanceModal: () => set({ isEditAttendanceModalOpen: true }),
  closeEditAttendanceModal: () => set({ isEditAttendanceModalOpen: false }),
});

export const useAttendanceStore = create(devtools(store, "AttendanceStore"));
