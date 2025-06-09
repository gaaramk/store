import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
