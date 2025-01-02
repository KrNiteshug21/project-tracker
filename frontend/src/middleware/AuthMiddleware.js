import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., token in localStorage)
    const token = localStorage.getItem("token");

    if (!token) {
      navigate(`/`);
    }
  }, [navigate]);

  return children; // Render children only if the user is logged in
};

export default AuthMiddleware;
