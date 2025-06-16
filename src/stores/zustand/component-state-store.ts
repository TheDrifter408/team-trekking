import { create } from 'zustand';

type DrawerState = {
  isOpen: boolean;
};

type UIStore = {
  drawers: Record<string, DrawerState>;
  openDrawer: (id: string, data?: unknown) => void;
  closeDrawer: (id: string) => void;
  toggleDrawer: (id: string) => void;
  isDrawerOpen: (id: string) => boolean;
};

export const useComponentStore = create<UIStore>((set, get) => ({
  drawers: {},
  openDrawer: (id, data) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [id]: { isOpen: true, data },
      },
    })),
  closeDrawer: (id) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [id]: { ...state.drawers[id], isOpen: false },
      },
    })),
  toggleDrawer: (id) =>
    set((state) => {
      const current = state.drawers[id]?.isOpen ?? false;
      return {
        drawers: {
          ...state.drawers,
          [id]: { ...state.drawers[id], isOpen: !current },
        },
      };
    }),
  isDrawerOpen: (id) => get().drawers[id]?.isOpen ?? false,
}));
