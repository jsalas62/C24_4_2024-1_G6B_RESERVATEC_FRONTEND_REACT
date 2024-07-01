import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, redirectTo = "/" }) => {
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const sessionCookie = getCookie('SESSION');

    if (!sessionCookie) {
        return <Navigate to={redirectTo} />;
    } else {
        return children ? children : <Outlet />;
    }
};

export default ProtectRoute;
