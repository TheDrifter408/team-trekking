import { useAuthStore } from '@/stores/zustand/auth-store.tsx';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import AppLayout from '@/components/layout/app-layout';
import { Fallback } from '@/components/common/fallback-route';
import { NotFound } from '@/components/common/not-found-route';
const RouteComponent = () => {
  const { getUser } = useAuthStore();
  const user = getUser(); // returns the user information from when the user signs up or logs in.
  const token = user?.token ?? 'randomString';
  return token ? <AppLayout /> : <Navigate to="/login" />;
};

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  pendingComponent: Fallback,
  notFoundComponent: NotFound,
});
