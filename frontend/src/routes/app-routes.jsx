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
import CustomerManagerSideBar from "../pages/customerManager/dashboard/CustomerManagerSideBar"
import Delivery_rider from "../pages/delivery_rider"
import EmployeeManagerSideBar from "../pages/Employee_Manager/Dashboard/EmployeeManagerSideBar";
import DeliveryManager_Orders from "../pages/deliveryManager_Orders"
import Table_Reservations from "../pages/Table_Reservations"
import VIP_Rooms from "../pages/VIP_Rooms"
import Outdoor_Events from "../pages/Outdoor_Events"
//import TableReservationsDashboard from "../pages/Table_Reservations/Dashboard";

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

          {/* Supplier Manager Private Routes */}
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
            <Route path="/deliveryManager/orders" element={<DeliveryManager_Orders />} />
          </Route>

          {/* Reservation Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/reservationManager" element={<ReservationManagerSideBar />} />
            <Route path="/reservationManager/tables" element={<Table_Reservations />} />
            <Route path="/reservationManager/rooms" element={<VIP_Rooms />} />
            <Route path="/reservationManager/events" element={<Outdoor_Events />} />
          </Route>
          
          {/* Order Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/orderManager" element={<OrderManagerSideBar />} />
          </Route>

          {/* Employee Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/employeeManager" element={<EmployeeManagerSideBar />} />
          </Route>

          {/* Customer Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/customerManager" element={<CustomerManagerSideBar />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;