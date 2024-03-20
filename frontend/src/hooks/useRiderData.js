import { useQuery } from "@tanstack/react-query";
import RiderAPI from "../api/RiderAPI";

export const useRiderData = () => {
  return useQuery(["riders"], () => RiderAPI.getAll());
};

export const useRiderCount = () => {
  return useQuery(["riderCount"], () => RiderAPI.getCount());
};
/*
export const useAvailableStock = () => {
  return useQuery(["availableStock"], () => RiderAPI.getAvailableStock());
};*/

export const useRider = (id) => {
  return useQuery(["rider", id], () => RiderAPI.getById(id));
};
