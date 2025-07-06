export const routes = {
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot',

  home: '/home',
  board: '/board',
  space: '/space',
  folder: '/folder',
  list: (listId: number | string) => `/list/${listId}`,
  calendar: '/calendar',
  inbox: '/inbox',

  task: (taskId: number | string) => `/task/${taskId}`,

  settings: {
    base: '/settings',
    general: '/settings/general',
    profile: '/settings/profile',
  },

  notFound: '*',
};

export type AppRoute = keyof typeof routes;
