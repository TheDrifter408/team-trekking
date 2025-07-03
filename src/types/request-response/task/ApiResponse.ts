import { Folder } from '@/types/request-response/workspace/ApiResponse';

export interface CheckList {
  id: number;
  title: string;
  isActive: boolean;
  items: Item[];
}

export interface Item {
  id: number;
  content: string;
  isDone: boolean;
  isActive: boolean;
}
export interface TaskResponse {
  id: number;
  name: string;
  description: string | null;
  startDate: string | null;
  dueDate: string | null;
  timeEstimate: number | null;
  sprintPoints: number | null;
  timeTracked: number | null;
  isActive: boolean;
  isArchive: boolean;

  list: {
    id: number;
    name: string;
    iconUrl: string | null;
    avatarKey: string | null;
    visibility: string;
    color: string | null;
    startDate: string | null;
    dueDate: string | null;
    isActive: boolean;
    createdAt: string;
    isInheritStatus: boolean;
    isPrivate: boolean;
    focusColor: string | null;

    createdBy: {
      id: number;
      fullName: string;
      email: string;
      image: string | null;
      forcePasswordChange: boolean;
      isActive: boolean;
    };

    priority: {
      id: number;
      title: string;
      color: string;
      isActive: boolean;
    } | null;

    status: {
      id: number;
      name: string;
      type: string;
      identifier: string;
      identifierId: number | null;
      isActive: boolean;
      createdAt: string;
    };

    space: {
      id: number;
      name: string;
      iconUrl: string | null;
      avatarKey: string | null;
      visibility: string;
      color: string | null;
      description: string;
      isPrivate: boolean;
      startDate: string | null;
      dueDate: string | null;
      isActive: boolean;
      createdAt: string;
      focusColor: string | null;

      createdBy: {
        id: number;
        fullName: string;
        email: string;
        image: string | null;
        forcePasswordChange: boolean;
        isActive: boolean;
      };

      priority: any | null; // Adjust this if `priority` is defined for space
      status: {
        id: number;
        name: string;
        type: string;
        identifier: string;
        identifierId: number | null;
        isActive: boolean;
        createdAt: string;
      };
    };

    folder: Folder | null;

    type: {
      id: number;
      name: string;
      label: string;
      icon: string | null;
      color: string | null;
      isActive: boolean;
    };
  };
  owner: {
    id: number;
    fullName: string;
    email: string;
    image: string | null;
    forcePasswordChange: boolean;
    isActive: boolean;
    role: {
      id: number;
      title: string;
    };
    userPermissions: any[]; // Adjust type if permission structure is known
  };
  type: {
    id: number;
    name: string;
    label: string;
    icon: string | null;
    color: string | null;
    isActive: boolean;
  };
}
