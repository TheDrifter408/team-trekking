import { Navigate, Outlet } from 'react-router-dom';

const privateRoute = () => {
  const token = localStorage.getItem('token'); // Read from localStorage
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default privateRoute;
