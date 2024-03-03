import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"


const PrivateRoute = () => {
    const { userinfo }=useSelector(state=>state.auth);
  return userinfo? <Outlet/> : <Navigate to="/login" replace/> // replace will replace any past history
}

export default PrivateRoute