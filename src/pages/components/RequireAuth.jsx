import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        <Navigate to="/event/ed-sheeran" state={{ from: location }} replace />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
