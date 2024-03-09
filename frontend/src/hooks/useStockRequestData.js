import { useQuery } from "@tanstack/react-query";
import StockRequestAPI from "../api/StockRequestAPI";

export const useStockRequestData = () => {
  return useQuery(["stock-requests"], () => StockRequestAPI.getAll());
};

export const useStockRequestCount = () => {
  return useQuery(["stockRequestCount"], () => StockRequestAPI.getCount());
};

export const useStockRequestCountForUser = () => {
  return useQuery(["stockRequestCountForUser"], () =>
    StockRequestAPI.stockRequestForSupplier()
  );
};
