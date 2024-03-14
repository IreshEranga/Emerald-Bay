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

import Customeraffairsidebar from "../pages/customer_affaies_manager/dashboard/customer_affairs_sidebar"
// import Customeraffairsdashboard from "../pages/customer_affaies_manager/dashboard/customer_affairs_dashboard"

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

        {/* customer affairs manager Private Routes */}

          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/customeraffairsmanager" element={<Customeraffairsidebar />} />
            <Route path="/admin/suppliers" element={<Supplier />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
