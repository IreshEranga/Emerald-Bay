import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";
import { USER_ROLES } from "../constants/roles";

import {
  Home,
  Login,
  AdminDashboard,
  Supplier,
  SupplierDashboard,
} from "../pages";

import DeliveryManagerSideBar from "../pages/delivery_manager/dasboard/DeliveryManagerSideBar"
import ReservationManagerSideBar from "../pages/reservation_manager/dashboard/ReservationManagerSideBar"
import OrderManagerSideBar from "../pages/order_manager/dashboard/OrderManagerSideBar"
import Delivery_rider from "../pages/delivery_rider"


const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Supplier Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.SUPPLIER]} />}>
            <Route path="/supplier" element={<SupplierDashboard />} />
            {/* <Route path="/supplier/profile" element={<SupplierProfile />} /> */}
          </Route>

          {/* Admin Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/suppliers" element={<Supplier />} />
          </Route>

          {/* Delivery Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/deliveryManager" element={<DeliveryManagerSideBar />} />
            <Route path="/deliveryManager/riders" element={<Delivery_rider />} />
          </Route>

          {/* Reservation Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/reservationManager" element={<ReservationManagerSideBar />} />
            <Route path="/admin/suppliers" element={<Supplier />} />
          </Route>
          {/* Order Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/orderManager" element={<OrderManagerSideBar />} />
            <Route path="/deliveryManager/riders" element={<Delivery_rider />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;