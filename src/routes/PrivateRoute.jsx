import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { checkUserStatus, USER_STATUS } from "../utils/checkAuth";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (checkUserStatus(auth, USER_STATUS.Active)) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/sign-in" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
