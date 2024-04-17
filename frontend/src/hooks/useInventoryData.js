import { useQuery } from "@tanstack/react-query";
import InventoryAPI from "../api/InventoryAPI";

export const useInventoryData = () => {
  return useQuery(["inventories"], () => InventoryAPI.getAll());
};

export const useInventoryCount = () => {
  return useQuery(["inventoryCount"], () => InventoryAPI.getCount());
};
