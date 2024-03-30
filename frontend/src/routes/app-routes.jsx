import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
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
import EmployeeManagerSideBar from "../pages/Employee_Manager/Dashboard/EmployeeManagerSideBar"
import Delivery_rider from "../pages/delivery_rider"
import DeliveryManager_Orders from "../pages/deliveryManager_Orders"
import Table_Reservations from "../pages/Table_Reservations"
import VIP_Rooms from "../pages/VIP_Rooms"
import Outdoor_Events from "../pages/Outdoor_Events"
import Reservations from '../pages/Reservations/Reservations'
import AboutUs from '../pages/AboutUs/AboutUs'
import Menu from "../pages/Menu/Menu"
import Gallery from "../pages/Gallery/Gallery";
import VIPRoomReservations from "../pages/Reservations/VIPRoomReservations";
import Events from "../pages/Reservations/Events";
import TableReservations from "../pages/Reservations/TableReservations";
import Register from "../pages/Register/Register";
import Userprofile from "../pages/Userprofile/Userprofile";



const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/vip-room-reservations" element={<VIPRoomReservations />} />
          <Route path="/table-reservations" element={<TableReservations/>} />
          <Route path="/events" element={<Events />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userProfile" element={<Userprofile />} />
          

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