import React from "react";
import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const DashboardLayout = () => {
  const { user, role, logout } = useAuth();
  return (
    <div className="dashboard-layout flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <p className="mb-6">Hello, {user?.email}</p>

        <nav className="flex flex-col space-y-3">
          {/* Common Dashboard Link */}
          <Link to="/dashboard" className="hover:underline">Home</Link>

          {/* Tourist Links */}
          {role === "tourist" && (
            <>
              <Link to="/dashboard/bookings" className="hover:underline">My Bookings</Link>
              <Link to="/dashboard/stories" className="hover:underline">My Stories</Link>
            </>
          )}


          {role === "guide" && (
            <>
              <Link to="/dashboard/guide/requests" className="hover:underline">Requests</Link>
              <Link to="/dashboard/guide/schedule" className="hover:underline">Schedule</Link>
            </>
          )}


          {role === "admin" && (
            <>
              <Link to="/dashboard/admin/users" className="hover:underline">Manage Users</Link>
              <Link to="/dashboard/admin/guides" className="hover:underline">Manage Guides</Link>
              <Link to="/dashboard/admin/packages" className="hover:underline">Manage Packages</Link>
            </>
          )}

          <button
            onClick={logout}
            className="mt-10 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;