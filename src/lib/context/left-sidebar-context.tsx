import { createContext, useState } from 'react';

interface LeftSidebarContextType {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
}

const LeftSidebarContext = createContext<LeftSidebarContextType | undefined>(undefined);

export const LeftSidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        console.log('Toggling leftsidebar.');
        setIsOpen(prev => !prev)
    };
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <LeftSidebarContext.Provider value={{ isOpen, toggle, open, close }}>
            {children}
        </LeftSidebarContext.Provider>
    );
};
