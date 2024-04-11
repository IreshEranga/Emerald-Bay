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
  }if (permissionLevel === USER_ROLES.CUSTOMER) {
    return <Navigate to="/customer" />;
  }  else {
    return <Outlet />;
  }
};

export default CheckLoginStatus;
