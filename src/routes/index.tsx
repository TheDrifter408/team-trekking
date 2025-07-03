import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '@/routes/privateRoute.tsx';
import { Fallback } from '../pages/fallback/fallback-route.tsx';

const AppLayout = lazy(() => import('@/pages/layout/app-layout.tsx'));
const HeaderLayout = lazy(() => import('@/pages/layout/task-layout.tsx'));
const SettingsLayout = lazy(() => import('@/pages/layout/settings-layout.tsx'));
const Login = lazy(() => import('@/pages/login/sign-in.tsx'));
const SignUp = lazy(() => import('@/pages/login/sign-up'));
const ForgotPassword = lazy(() => import('@/pages/login/forgot-password.tsx'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Board = lazy(() => import('@/pages/board'));
const Space = lazy(() => import('@/pages/space'));
const Folder = lazy(() => import('@/pages/folder'));
const List = lazy(() => import('@/pages/list'));
const Task = lazy(() => import('@/pages/task'));
const Calendar = lazy(() => import('@/pages/calendar'));
const Inbox = lazy(() => import('@/pages/inbox'));
const Settings = lazy(() => import('@/pages/settings'));
const Profile = lazy(() => import('@/pages/settings/profile'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />

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
            <Route path="task/:taskId" element={<Task />} />
          </Route>
          <Route path="settings" element={<SettingsLayout />}>
            <Route path="general" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
