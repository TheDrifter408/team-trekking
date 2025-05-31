import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/pages/layout/app-layout.tsx';
import { HeaderLayout } from '@/pages/layout/header-layout.tsx';
import { Login } from '@/pages/login/sign-in.tsx';
import { SignUp } from '@/pages/login/sign-up';
import { ForgotPassword } from '@/pages/login/forgot-password.tsx';
import { Dashboard } from '@/pages/dashboard';
import { Board } from '@/pages/board';
import { Space } from '@/pages/space';
import { Folder } from '@/pages/folder';
import { List } from '@/pages/list';
import { Task } from '@/pages/task';
import { Calendar } from '@/pages/calendar';
import { Inbox } from '@/pages/inbox';
import PrivateRoute from '@/routes/privateRoute.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="board" element={<Board />} />
          <Route path="space" element={<Space />} />
          <Route path="folder" element={<Folder />} />
          <Route path="list" element={<List />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="inbox" element={<Inbox />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route path="task" element={<Task />} />
        </Route>
      </Route>

      {/* Redirect unknown routes to login. will be changed to a 404 page later */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
