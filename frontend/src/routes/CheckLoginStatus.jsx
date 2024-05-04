import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { USER_ROLES } from "../constants/roles";

const CheckLoginStatus = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Outlet />;
  }

  const permissionLevel = user.role;

  if (permissionLevel === USER_ROLES.SUPPLIER) {
    return <Navigate to="/supplier" />;
  }
  if (permissionLevel === USER_ROLES.RIDER) {
    return <Navigate to="/rider" />;
  }
  if (permissionLevel === USER_ROLES.DELIVERYMANAGER) {
    return <Navigate to="/deliveryManager" />;
  }
  if (permissionLevel === USER_ROLES.ADMIN) {
    return <Navigate to="/admin" />;
  }
  if (permissionLevel === USER_ROLES.CUSTOMER) {
    return <Navigate to="/customer" />;
  }
  if (permissionLevel === USER_ROLES.INVENTORYMANAGER) {
    return <Navigate to="/inventory-manager" />;
  }
  if (permissionLevel === USER_ROLES.EMPLOYEE) {
    return <Navigate to="/employee" />;ßß
  }
  if (permissionLevel === USER_ROLES.CUSTOMERAFFAIRSMANAGER) {
    return <Navigate to="/customer-affairs-manager" />;
  } else {
    return <Navigate to="/employee" />;
  }if (permissionLevel === USER_ROLES.CUSTOMERMANAGER) {
    return <Navigate to="/customerManager" />;
  }if (permissionLevel === USER_ROLES.CUSTOMERAFFAIRSMANAGER) {
    return <Navigate to="/CustomerAffairsManager" />;
  }else{
    return <Outlet />;
  }
};

export default CheckLoginStatus;
