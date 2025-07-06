import { useTMTStore } from '@/stores/zustand';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import TaskLayout from '@/pages/layout/task-layout';
const RouteComponent = () => {
  const { getUser } = useTMTStore();
  const user = getUser(); // returns the user information from when the user signs up or logs in.
  const token = user?.token ?? 'randomString';
  return token ? <TaskLayout /> : <Navigate to="/login" />;
};

export const Route = createFileRoute('/_authNoLayout')({
  component: RouteComponent,
});
