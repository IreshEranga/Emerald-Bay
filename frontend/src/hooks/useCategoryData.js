import { useQuery } from "@tanstack/react-query";
import CategoryAPI from "../api/CategoryAPI";

export const useCategoryData = () => {
  return useQuery(["categories"], () => CategoryAPI.getAll());
};

export const useCategoryCount = () => {
  return useQuery(["categoryCount"], () => CategoryAPI.getCount());
};