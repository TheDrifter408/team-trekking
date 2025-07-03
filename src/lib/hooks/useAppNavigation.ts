// src/hooks/useAppNavigation.ts
import { useNavigate } from 'react-router-dom';
import { routes } from '@/lib/constants/appRoutes';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navigates to a given route.
   * - If `id` is provided, it assumes the route is a function (e.g. routes.task)
   * - If `id` is not provided, it assumes the route is a static string (e.g. routes.login)
   */
  const goTo = (
    route: string | ((id: number | string) => string),
    id?: number | string,
    replace = false
  ) => {
    const path = typeof route === 'function' ? route(id!) : route;
    navigate(path, { replace });
  };

  return {
    navigate: goTo,
    routes,
  };
};
