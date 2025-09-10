import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/home" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/home" />;
    }
  } catch (error) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
