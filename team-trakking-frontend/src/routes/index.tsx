import { Routes, Route, Navigate } from 'react-router';
import { Home, Login, Workspace } from '@/pages/index';
import { Layout } from '@/components/Common/Layout';
import PrivateRoute from '@/routes/privateRoute.tsx';
import { WorkspaceProvider } from '@/context/LayoutContext.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Set default route to Login always */}
      <Route path="/" element={<Navigate to={'/login'} replace />} />

      <Route path={'/login'} element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path={'/home'} element={<Home />} />
      </Route>

      {/* All components under this layout will be rendered without page refresh.
      Include space x folder x list */}
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <WorkspaceProvider>
              <Layout />
            </WorkspaceProvider>
          }
        >
          <Route path={'/workspace/:workspaceId'} element={<Workspace />} />
        </Route>
      </Route>

      {/* All unknown routes redirects to login ** Shall be replaced with 404 page later...*/}
      <Route path="*" element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
