import { useTMTStore } from '@/stores/zustand';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import AppLayout from '@/components/layout/app-layout';
const RouteComponent = () => {
  const { getUser } = useTMTStore();
  const user = getUser(); // returns the user information from when the user signs up or logs in.
  const token = user?.token ?? 'randomString';
  return token ? <AppLayout /> : <Navigate to="/login" />;
};

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  notFoundComponent: () => {
    return <p>This page doesn't exist</p>;
  }
});
