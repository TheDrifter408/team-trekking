/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as UnauthRouteRouteImport } from './routes/_unauth/route'
import { Route as AuthRouteRouteImport } from './routes/_auth/route'
import { Route as UnauthSignupRouteImport } from './routes/_unauth/signup'
import { Route as UnauthLoginRouteImport } from './routes/_unauth/login'
import { Route as UnauthForgotRouteImport } from './routes/_unauth/forgot'
import { Route as AuthInboxIndexRouteImport } from './routes/_auth/inbox/index'
import { Route as AuthHomeIndexRouteImport } from './routes/_auth/home/index'
import { Route as AuthFolderIndexRouteImport } from './routes/_auth/folder/index'
import { Route as AuthCalenderIndexRouteImport } from './routes/_auth/calender/index'
import { Route as AuthBoardIndexRouteImport } from './routes/_auth/board/index'
import { Route as AuthTaskTaskIdRouteImport } from './routes/_auth/task/$taskId'
import { Route as AuthSpaceSpaceIdRouteImport } from './routes/_auth/space/$spaceId'
import { Route as AuthListListIdRouteImport } from './routes/_auth/list/$listId'
import { Route as AuthSettingsProfileIndexRouteImport } from './routes/_auth/settings/profile/index'
import { Route as AuthSettingsGeneralIndexRouteImport } from './routes/_auth/settings/general/index'

const UnauthRouteRoute = UnauthRouteRouteImport.update({
  id: '/_unauth',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthRouteRoute = AuthRouteRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRouteImport,
} as any)
const UnauthSignupRoute = UnauthSignupRouteImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => UnauthRouteRoute,
} as any)
const UnauthLoginRoute = UnauthLoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => UnauthRouteRoute,
} as any)
const UnauthForgotRoute = UnauthForgotRouteImport.update({
  id: '/forgot',
  path: '/forgot',
  getParentRoute: () => UnauthRouteRoute,
} as any)
const AuthInboxIndexRoute = AuthInboxIndexRouteImport.update({
  id: '/inbox/',
  path: '/inbox/',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthHomeIndexRoute = AuthHomeIndexRouteImport.update({
  id: '/home/',
  path: '/home/',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthFolderIndexRoute = AuthFolderIndexRouteImport.update({
  id: '/folder/',
  path: '/folder/',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthCalenderIndexRoute = AuthCalenderIndexRouteImport.update({
  id: '/calender/',
  path: '/calender/',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthBoardIndexRoute = AuthBoardIndexRouteImport.update({
  id: '/board/',
  path: '/board/',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthTaskTaskIdRoute = AuthTaskTaskIdRouteImport.update({
  id: '/task/$taskId',
  path: '/task/$taskId',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthSpaceSpaceIdRoute = AuthSpaceSpaceIdRouteImport.update({
  id: '/space/$spaceId',
  path: '/space/$spaceId',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthListListIdRoute = AuthListListIdRouteImport.update({
  id: '/list/$listId',
  path: '/list/$listId',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthSettingsProfileIndexRoute =
  AuthSettingsProfileIndexRouteImport.update({
    id: '/settings/profile/',
    path: '/settings/profile/',
    getParentRoute: () => AuthRouteRoute,
  } as any)
const AuthSettingsGeneralIndexRoute =
  AuthSettingsGeneralIndexRouteImport.update({
    id: '/settings/general/',
    path: '/settings/general/',
    getParentRoute: () => AuthRouteRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/forgot': typeof UnauthForgotRoute
  '/login': typeof UnauthLoginRoute
  '/signup': typeof UnauthSignupRoute
  '/list/$listId': typeof AuthListListIdRoute
  '/space/$spaceId': typeof AuthSpaceSpaceIdRoute
  '/task/$taskId': typeof AuthTaskTaskIdRoute
  '/board': typeof AuthBoardIndexRoute
  '/calender': typeof AuthCalenderIndexRoute
  '/folder': typeof AuthFolderIndexRoute
  '/home': typeof AuthHomeIndexRoute
  '/inbox': typeof AuthInboxIndexRoute
  '/settings/general': typeof AuthSettingsGeneralIndexRoute
  '/settings/profile': typeof AuthSettingsProfileIndexRoute
}
export interface FileRoutesByTo {
  '/forgot': typeof UnauthForgotRoute
  '/login': typeof UnauthLoginRoute
  '/signup': typeof UnauthSignupRoute
  '/list/$listId': typeof AuthListListIdRoute
  '/space/$spaceId': typeof AuthSpaceSpaceIdRoute
  '/task/$taskId': typeof AuthTaskTaskIdRoute
  '/board': typeof AuthBoardIndexRoute
  '/calender': typeof AuthCalenderIndexRoute
  '/folder': typeof AuthFolderIndexRoute
  '/home': typeof AuthHomeIndexRoute
  '/inbox': typeof AuthInboxIndexRoute
  '/settings/general': typeof AuthSettingsGeneralIndexRoute
  '/settings/profile': typeof AuthSettingsProfileIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_auth': typeof AuthRouteRouteWithChildren
  '/_unauth': typeof UnauthRouteRouteWithChildren
  '/_unauth/forgot': typeof UnauthForgotRoute
  '/_unauth/login': typeof UnauthLoginRoute
  '/_unauth/signup': typeof UnauthSignupRoute
  '/_auth/list/$listId': typeof AuthListListIdRoute
  '/_auth/space/$spaceId': typeof AuthSpaceSpaceIdRoute
  '/_auth/task/$taskId': typeof AuthTaskTaskIdRoute
  '/_auth/board/': typeof AuthBoardIndexRoute
  '/_auth/calender/': typeof AuthCalenderIndexRoute
  '/_auth/folder/': typeof AuthFolderIndexRoute
  '/_auth/home/': typeof AuthHomeIndexRoute
  '/_auth/inbox/': typeof AuthInboxIndexRoute
  '/_auth/settings/general/': typeof AuthSettingsGeneralIndexRoute
  '/_auth/settings/profile/': typeof AuthSettingsProfileIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/forgot'
    | '/login'
    | '/signup'
    | '/list/$listId'
    | '/space/$spaceId'
    | '/task/$taskId'
    | '/board'
    | '/calender'
    | '/folder'
    | '/home'
    | '/inbox'
    | '/settings/general'
    | '/settings/profile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/forgot'
    | '/login'
    | '/signup'
    | '/list/$listId'
    | '/space/$spaceId'
    | '/task/$taskId'
    | '/board'
    | '/calender'
    | '/folder'
    | '/home'
    | '/inbox'
    | '/settings/general'
    | '/settings/profile'
  id:
    | '__root__'
    | '/_auth'
    | '/_unauth'
    | '/_unauth/forgot'
    | '/_unauth/login'
    | '/_unauth/signup'
    | '/_auth/list/$listId'
    | '/_auth/space/$spaceId'
    | '/_auth/task/$taskId'
    | '/_auth/board/'
    | '/_auth/calender/'
    | '/_auth/folder/'
    | '/_auth/home/'
    | '/_auth/inbox/'
    | '/_auth/settings/general/'
    | '/_auth/settings/profile/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  UnauthRouteRoute: typeof UnauthRouteRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_unauth': {
      id: '/_unauth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnauthRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_unauth/signup': {
      id: '/_unauth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof UnauthSignupRouteImport
      parentRoute: typeof UnauthRouteRoute
    }
    '/_unauth/login': {
      id: '/_unauth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof UnauthLoginRouteImport
      parentRoute: typeof UnauthRouteRoute
    }
    '/_unauth/forgot': {
      id: '/_unauth/forgot'
      path: '/forgot'
      fullPath: '/forgot'
      preLoaderRoute: typeof UnauthForgotRouteImport
      parentRoute: typeof UnauthRouteRoute
    }
    '/_auth/inbox/': {
      id: '/_auth/inbox/'
      path: '/inbox'
      fullPath: '/inbox'
      preLoaderRoute: typeof AuthInboxIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/home/': {
      id: '/_auth/home/'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof AuthHomeIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/folder/': {
      id: '/_auth/folder/'
      path: '/folder'
      fullPath: '/folder'
      preLoaderRoute: typeof AuthFolderIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/calender/': {
      id: '/_auth/calender/'
      path: '/calender'
      fullPath: '/calender'
      preLoaderRoute: typeof AuthCalenderIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/board/': {
      id: '/_auth/board/'
      path: '/board'
      fullPath: '/board'
      preLoaderRoute: typeof AuthBoardIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/task/$taskId': {
      id: '/_auth/task/$taskId'
      path: '/task/$taskId'
      fullPath: '/task/$taskId'
      preLoaderRoute: typeof AuthTaskTaskIdRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/space/$spaceId': {
      id: '/_auth/space/$spaceId'
      path: '/space/$spaceId'
      fullPath: '/space/$spaceId'
      preLoaderRoute: typeof AuthSpaceSpaceIdRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/list/$listId': {
      id: '/_auth/list/$listId'
      path: '/list/$listId'
      fullPath: '/list/$listId'
      preLoaderRoute: typeof AuthListListIdRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/settings/profile/': {
      id: '/_auth/settings/profile/'
      path: '/settings/profile'
      fullPath: '/settings/profile'
      preLoaderRoute: typeof AuthSettingsProfileIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/settings/general/': {
      id: '/_auth/settings/general/'
      path: '/settings/general'
      fullPath: '/settings/general'
      preLoaderRoute: typeof AuthSettingsGeneralIndexRouteImport
      parentRoute: typeof AuthRouteRoute
    }
  }
}

interface AuthRouteRouteChildren {
  AuthListListIdRoute: typeof AuthListListIdRoute
  AuthSpaceSpaceIdRoute: typeof AuthSpaceSpaceIdRoute
  AuthTaskTaskIdRoute: typeof AuthTaskTaskIdRoute
  AuthBoardIndexRoute: typeof AuthBoardIndexRoute
  AuthCalenderIndexRoute: typeof AuthCalenderIndexRoute
  AuthFolderIndexRoute: typeof AuthFolderIndexRoute
  AuthHomeIndexRoute: typeof AuthHomeIndexRoute
  AuthInboxIndexRoute: typeof AuthInboxIndexRoute
  AuthSettingsGeneralIndexRoute: typeof AuthSettingsGeneralIndexRoute
  AuthSettingsProfileIndexRoute: typeof AuthSettingsProfileIndexRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthListListIdRoute: AuthListListIdRoute,
  AuthSpaceSpaceIdRoute: AuthSpaceSpaceIdRoute,
  AuthTaskTaskIdRoute: AuthTaskTaskIdRoute,
  AuthBoardIndexRoute: AuthBoardIndexRoute,
  AuthCalenderIndexRoute: AuthCalenderIndexRoute,
  AuthFolderIndexRoute: AuthFolderIndexRoute,
  AuthHomeIndexRoute: AuthHomeIndexRoute,
  AuthInboxIndexRoute: AuthInboxIndexRoute,
  AuthSettingsGeneralIndexRoute: AuthSettingsGeneralIndexRoute,
  AuthSettingsProfileIndexRoute: AuthSettingsProfileIndexRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

interface UnauthRouteRouteChildren {
  UnauthForgotRoute: typeof UnauthForgotRoute
  UnauthLoginRoute: typeof UnauthLoginRoute
  UnauthSignupRoute: typeof UnauthSignupRoute
}

const UnauthRouteRouteChildren: UnauthRouteRouteChildren = {
  UnauthForgotRoute: UnauthForgotRoute,
  UnauthLoginRoute: UnauthLoginRoute,
  UnauthSignupRoute: UnauthSignupRoute,
}

const UnauthRouteRouteWithChildren = UnauthRouteRoute._addFileChildren(
  UnauthRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  AuthRouteRoute: AuthRouteRouteWithChildren,
  UnauthRouteRoute: UnauthRouteRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
