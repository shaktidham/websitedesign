import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  // const token = localStorage.getItem("authToken");
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return props.children;
};

export default PrivateRoute;
