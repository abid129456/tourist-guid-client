import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Trips from "../pages/Trips";
import Community from "../pages/Community";
import PackageBooking from "../pages/PackageBooking";
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/NotFound";


import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";  // 
import TouristBookings from "../pages/dashboard/tourist/Bookings";
import TouristStories from "../pages/dashboard/tourist/Stories";

import GuideRequests from "../pages/dashboard/guide/Requests";
import GuideSchedule from "../pages/dashboard/guide/Schedule";

import AdminUsers from "../pages/dashboard/admin/Users";
import AdminGuides from "../pages/dashboard/admin/Guides";
import AdminPackages from "../pages/dashboard/admin/Packages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/trips", element: <Trips /> },
      { path: "/community", element: <Community /> },
      { path: "/book-package", element: <PackageBooking /> },
      { path: "/about", element: <AboutUs /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [

      {
        path: "bookings",
        element: (
          <RoleBasedRoute allowedRoles={["tourist"]}>
            <TouristBookings />
          </RoleBasedRoute>
        ),
      },
      {
        path: "stories",
        element: (
          <RoleBasedRoute allowedRoles={["tourist"]}>
            <TouristStories />
          </RoleBasedRoute>
        ),
      },

      {
        path: "guide/requests",
        element: (
          <RoleBasedRoute allowedRoles={["guide"]}>
            <GuideRequests />
          </RoleBasedRoute>
        ),
      },
      {
        path: "guide/schedule",
        element: (
          <RoleBasedRoute allowedRoles={["guide"]}>
            <GuideSchedule />
          </RoleBasedRoute>
        ),
      },


      {
        path: "admin/users",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </RoleBasedRoute>
        ),
      },
      {
        path: "admin/guides",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminGuides />
          </RoleBasedRoute>
        ),
      },
      {
        path: "admin/packages",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminPackages />
          </RoleBasedRoute>
        ),
      },
    ],
  },
]);

export { router };
