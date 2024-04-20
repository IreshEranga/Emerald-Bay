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
  Delivery_riderDashboard,
  InventoryManagerDashboard,
  EmployeeDashboard,
} from "../pages";

import CustomerAffairsManagerSideBar from "../pages/customerAffairs/dashboard/CustomerAffairsManagerSidebar.jsx";
import Customers from "../pages/customerManager/dashboard/customers.jsx";
import DeliveryManagerSideBar from "../pages/delivery_manager/dasboard/DeliveryManagerSideBar"
import ReservationManagerSideBar from "../pages/reservation_manager/dashboard/ReservationManagerSideBar"
import OrderManagerSideBar from "../pages/order_manager/dashboard/OrderManagerSideBar"
import CustomerManagerSideBar from "../pages/customerManager/dashboard/CustomerManagerSideBar"
import EmployeeManagerSideBar from "../pages/Employee_Manager/Dashboard/EmployeeManagerSideBar"
import Delivery_rider from "../pages/delivery_rider"
import DeliveryManager_Orders from "../pages/deliveryManager_Orders"
import Table_Reservations from "../pages/reservation_manager/dashboard/tableReservations"
import VIP_Rooms from "../pages/reservation_manager/dashboard/vipRoomReservations"
import Outdoor_Events from "../pages/reservation_manager/dashboard/events"
import Reservations from '../pages/Reservations/Reservations'
import VIPRoomReservations from "../pages/Reservations/VIPRoomReservations"
import Events from "../pages/Reservations/Events"
import TableReservations from "../pages/Reservations/TableReservations"
import AboutUs from '../pages/AboutUs/AboutUs'
import Menu from "../pages/Menu/Menu"
import Gallery from "../pages/Gallery/Gallery"
import Register from "../pages/Register/Register"
import Items from "../pages/order_manager/dashboard/items"
import Menu_Items from "../pages/order_manager/dashboard/Menu.js"
import Customer_Home from "../pages/Registered_Customer/index"
import Customer_Reservations from "../pages/Registered_Customer/reservations"
import Customer_Menu from "../pages/Registered_Customer/menu"
import Orders from "../pages/order_manager/dashboard/orders.jsx"
import Userprofile from "../pages/Userprofile/Userprofile"
import User_Reservations from "../pages/Userprofile/Reservations.jsx"
import User_Orders from "../pages/Userprofile/Orders.jsx"
import Cart from "../pages/Cart/Cart"
import Employee from "../pages/employee";
import RiderViewProfile from "../pages/delivery_rider/dashboard/RiderViewProfile.jsx";
import EmployeeViewProfile from "../pages/employee/Dashboard/EmployeeViewProfile.jsx";




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
          

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Customer Affairs Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}>
            <Route path="/CustomerAffairsManager" element={<CustomerAffairsManagerSideBar />} />
          </Route>

          {/* Customer Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.CUSTOMER]} />}>
            <Route path="/customer" element={<Customer_Home />} />
            <Route path="/customer_reservations" element={<Customer_Reservations />} />
            <Route path="/customer_menu" element={<Customer_Menu />} />
            <Route path="/view_profile" element={<Userprofile />} />
            <Route path="/view_reservations" element={<User_Reservations />} />
            <Route path="/view_orders" element={<User_Orders />} />
            <Route path="/view_cart" element={<Cart/>}/>
          </Route>

          {/* Supplier Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.SUPPLIER]} />}>
            <Route path="/supplier" element={<SupplierDashboard />} />
            {/* <Route path="/supplier/profile" element={<SupplierProfile />} /> */}
          </Route>

          {/* Supplier Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/suppliers" element={<Supplier />} />
          </Route>

          {/* Delivery Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.DELIVERYMANAGER]} />}>
            <Route path="/deliveryManager" element={<DeliveryManagerSideBar />} />
            <Route path="/deliveryManager/riders" element={<Delivery_rider />} />
            <Route path="/deliveryManager/orders" element={<DeliveryManager_Orders />} />
          </Route>

          {/* Delivery Rider Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.RIDER]} />}>
            <Route path="/rider" element={<Delivery_riderDashboard />} />
            {/* <Route path="/supplier/profile" element={<SupplierProfile />} /> */}
          </Route>

          {/* Reservation Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.RESERVATIONMANAGER]} />}>
            <Route path="/reservationManager" element={<ReservationManagerSideBar />} />
            <Route path="/reservationManager/tables" element={<Table_Reservations />} />
            <Route path="/reservationManager/rooms" element={<VIP_Rooms />} />
            <Route path="/reservationManager/events" element={<Outdoor_Events />} />
          </Route>
          
          {/* Order Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}>
            <Route path="/orderManager" element={<OrderManagerSideBar />} />
            <Route path="/orderManager/menu" element={<Menu_Items />} /> 
            <Route path="/add-item" element={<Items />} />
            <Route path="/orders" element ={<Orders/>} />       
          </Route>

          {/* Employee Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}>
            <Route path="/employeeManager" element={<EmployeeManagerSideBar />} />
            <Route path="/employeeManager/employees" element={<Employee />} />
           
          </Route>

          {/* Customer Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}>
            <Route path="/customerManager" element={<CustomerManagerSideBar />} />
            <Route path="/customerManager/customers" element={<Customers />} />
          </Route>

          {/* Inventory Manager Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.INVENTORYMANAGER]} />}>
            <Route path="/inventory-manager" element={<InventoryManagerDashboard />} />
          </Route>

          {/* Delivery Rider Private Routes */}
          <Route element={<PrivateRoute permissionLevel={[USER_ROLES.EMPLOYEE]} />}>
            <Route path="/employee" element={<EmployeeDashboard />} />
            {/* <Route path="/supplier/profile" element={<SupplierProfile />} /> */}
          </Route>

        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;