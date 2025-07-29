// // src/routes/RoleBasedRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const RoleBasedRoute = ({ allowedRoles, children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   const { data: role, isLoading } = useQuery({
//     queryKey: ["user-role", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:5000/user/role/${user.email}`);
//       return res.data.role;
//     },
//   });

//   if (loading || isLoading) return <p className="text-center mt-20">Loading...</p>;

//   if (!user || !allowedRoles.includes(role)) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default RoleBasedRoute;


import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleBasedRoute;
