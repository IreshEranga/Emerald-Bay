import { useQuery } from "@tanstack/react-query";
import SupplierAPI from "../api/SupplierAPI";

export const useSupplierData = () => {
  return useQuery(["suppliers"], () => SupplierAPI.getAll());
};

export const useSupplierCount = () => {
  return useQuery(["supplierCount"], () => SupplierAPI.getCount());
};

export const useAvailableStock = () => {
  return useQuery(["availableStock"], () => SupplierAPI.getAvailableStock());
};

export const useSupplier = (id) => {
  return useQuery(["supplier", id], () => SupplierAPI.getById(id));
};
