// import necessary utility from rrd
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const PrivateRoute = () => {
  const [state] = useContext(AuthContext);

  return state.isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;