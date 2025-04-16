import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/pages/layout/app-layout.tsx';
import { HeaderLayout } from '@/pages/layout/header-layout.tsx';
import { Login } from '@/pages/login';
import { Dashboard } from '@/pages/dashboard';
import { Board } from '@/pages/board';
import { Space } from '@/pages/space';
import { Folder } from '@/pages/folder';
import { List } from '@/pages/list';
import { Task } from '@/pages/task';
import { Calendar } from '@/pages/calendar';
import PrivateRoute from '@/routes/PrivateRoute.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="board" element={<Board />} />
          <Route path="space" element={<Space />} />
          <Route path="folder" element={<Folder />} />
          <Route path="list" element={<List />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route path="task" element={<Task />} />
        </Route>
      </Route>

      {/* Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
