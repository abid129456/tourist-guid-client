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

];

export default AdminRoutes;
