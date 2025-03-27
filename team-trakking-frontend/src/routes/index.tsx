import { Routes, Route, Navigate } from 'react-router';
import {
  Home,
  Login,
  Workspace,
  Space,
  Folder,
  Task,
  List,
  Subtask,
  Board,
} from '@/pages/index';
import { Layout } from '@/components/Common/Layout';
import PrivateRoute from '@/routes/privateRoute.tsx';

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
        <Route element={<Layout />}>
          <Route path={'/workspace/:workspaceId'} element={<Workspace />} />
          <Route path={'/space/:spaceId'} element={<Space />} />
          <Route path={'/folder/:folderId'} element={<Folder />} />
          <Route path={'/Task/:taskId'} element={<Task />} />
          <Route path={'/List/:listId'} element={<List />} />
          <Route path={'/subtask/:subtaskId'} element={<Subtask />} />
          <Route path={'/board/:boardId'} element={<Board />} />
        </Route>
      </Route>

      {/* All unknown routes redirects to login ** Shall be replaced with 404 page later...*/}
      <Route path="*" element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
