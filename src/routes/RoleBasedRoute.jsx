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
