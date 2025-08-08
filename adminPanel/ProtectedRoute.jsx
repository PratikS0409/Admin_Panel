import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "./src/context/storeContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();

  const { getCookie } = useContext(StoreContext);

  useEffect(() => {
    const role = getCookie("role");
    if (!allowedRoles.includes(role)) {
      toast.error("You do not have permission to access this page");
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "token_no=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, []);

  return children;
};

export default ProtectedRoute;
