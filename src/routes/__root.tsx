import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { NotFound } from '@/components/common/not-found-route';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
