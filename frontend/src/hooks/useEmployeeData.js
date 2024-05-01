import { useQuery } from "@tanstack/react-query";
import EmployeeAPI from "../api/EmployeeAPI";

export const useEmployeeData = () => {
  return useQuery(["employees"], () => EmployeeAPI.getAll());
};

export const useEmployeeCount = () => {
  return useQuery(["employeeCount"], () => EmployeeAPI.getCount());
};

export const useEmployee = (id) => {
  return useQuery(["employee", id], () => EmployeeAPI.getById(id));
};

