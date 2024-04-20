import { useQuery } from "@tanstack/react-query";
import AttendanceAPI from "../api/AttendanceAPI";

export const useAttendanceData = () => {
  return useQuery("attendanceData", AttendanceAPI.getAll, {
    retry: false, // Disable automatic retries on failure
    cacheTime: 600000, // Cache data for 10 minutes (adjust as needed)
    staleTime: 300000, // Mark data as stale after 5 minutes (adjust as needed)
  });
};

export const useAttendanceCount = () => {
  return useQuery("attendanceCount", AttendanceAPI.getCount, {
    retry: false,
    cacheTime: 600000,
    staleTime: 300000,
  });
};

export const useAttendance = (id) => {
  return useQuery(["attendance", id], () => AttendanceAPI.getById(id), {
    retry: false,
    cacheTime: 600000,
    staleTime: 300000,
  });
};
