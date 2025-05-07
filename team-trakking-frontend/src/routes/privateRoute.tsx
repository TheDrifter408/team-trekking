import { Navigate, Outlet } from 'react-router-dom';
import { useTMTStore } from '@/stores/zustand';

const PrivateRoute = () => {
  const { getUser } = useTMTStore();
  const user = getUser();
  // const token = user?.token ?? '';
  const token = 'somthing';
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
