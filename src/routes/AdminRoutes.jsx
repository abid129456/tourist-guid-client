// client/src/routes/AdminRoutes.jsx

import ManageGuides from "../dashboard/AdminDashboard/ManageGuides";
import RoleBasedRoute from "./RoleBasedRoute";

const AdminRoutes = [
  {
    path: "manage-guides",
    element: (
      <RoleBasedRoute allowedRoles={["admin"]}>
        <ManageGuides />
      </RoleBasedRoute>
    ),
  },
  // অন্য Admin routes এখানে যুক্ত করতে পারো
];

export default AdminRoutes;
