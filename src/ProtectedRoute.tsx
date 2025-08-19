import { useEffect, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchProfile } from "./store/authSlice";
// import { useNavigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate()
  const { data } = useAppSelector((state) => state.auth);

useEffect(()=>{
      dispatch(fetchProfile())
     
},[dispatch])

// if(!token){
//   navigate("/signin")
//   return null;
// }

  
  if(data?.role == "admin"){
    return (
      <>{children}</>
    )
  }else{
    return(
      <>You don't have permission</>
    )
  }
};

export default ProtectedRoute;
