import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  roomreservations: [],
  selectedRoom: null,
  isAddRoomReservationsOpen: false,
  isEditRoomReservationsOpen: false,
};

const store = (set) => ({
  ...initialState,
  setRooms: (rooms) => set({ rooms }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  openAddRoomReservations: () => set({ isAddRoomReservationsOpen: true }),
  closeAddRoomReservations: () => set({ isAddRoomReservationsOpen: false }),
  openEditRoomReservations: () => set({ isEditRoomReservationsOpen: true }),
  closeEditRoomReservations: () => set({ isEditRoomReservationsOpen: false }),
});

export const useVIPRoomStore = create(devtools(store, "roomStore"));
