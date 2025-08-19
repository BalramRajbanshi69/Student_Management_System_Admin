import { useEffect, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchProfile } from "./store/authSlice";
import { useNavigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(fetchProfile());
    } else {
      navigate("/signin");
    }
  }, [dispatch, navigate]);


  // Render children if user is admin
  if (data?.role === "admin") {
    return <>{children}</>;
  } else {
    return (
      <>
        <div className="text-white">You don't have permission</div>
      </>
    );
  }
};

export default ProtectedRoute;
