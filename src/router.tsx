import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
  });
}

// Create the router instance for type registration
const router = createRouter();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
