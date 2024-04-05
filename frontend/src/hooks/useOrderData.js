import { useQuery } from "@tanstack/react-query";
import OrderAPI from "../api/OrderAPI";

export const useOrderData = () => {
  return useQuery(["orders"], () => OrderAPI.getAll());
};

export const useOrderCount = () => {
  return useQuery(["orderscount"], () => OrderAPI.getCount());
};

export const useDeliverRequestCountForRider = () => {
  return useQuery(["deliverRequestCountForRider"], () =>
    OrderAPI.deliverRequestForRider()
  );
};
