import { Navigate, Outlet } from 'react-router-dom';
import { useTMTStore } from '@/stores/zustand';
import { ListDataTableProvider } from '@/lib/context/list-data-table-context.tsx';

const PrivateRoute = () => {
  const { getUser } = useTMTStore();
  const user = getUser();
  const token = user?.token ?? 'randomString';
  return (
    <ListDataTableProvider>
      {token ? <Outlet /> : <Navigate to="/login" />}
    </ListDataTableProvider>
  );
};

export default PrivateRoute;
