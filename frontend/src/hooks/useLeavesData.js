import { useQuery } from "@tanstack/react-query"; 
import leavesAPI from "../api/leavesAPI"; 

export const useLeavesData = () => {
  return useQuery(['leaveRequests'], leavesAPI.getAll);
};

export const useLeaves = (id) => {
  return useQuery(['leaveRequest', id], () => leavesAPI.getById(id), {
    select: (data) => (data ? data : null),
  });
};

export const useleaveRequestForEmployee = () => {
  return useQuery(["leaveRequestForEmployee"], () =>
  leavesAPI.leaveRequestForEmployee()
  );
};
