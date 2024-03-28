import { useQuery } from "@tanstack/react-query";
import VIPRoomAPI from "../api/VIPRoomAPI";

export const useRoomData = () => {
  return useQuery(["rooms"], () => VIPRoomAPI.getAll());
};

export const useReservationCount = () => {
  return useQuery(["reservationCount"], () => VIPRoomAPI.getCount());
};
/*
export const useAvailableStock = () => {
  return useQuery(["availableStock"], () => RiderAPI.getAvailableStock());
};*/

export const useReservation = (id) => {
  return useQuery(["room", id], () => VIPRoomAPI.getById(id));
};
