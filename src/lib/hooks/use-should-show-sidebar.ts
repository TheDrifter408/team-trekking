import { useEffect, useState } from 'react';

export const useShouldShowSidebar = (isTaskRoute: boolean) => {
  const [shouldShowSidebar, setShouldShowSidebar] = useState(!isTaskRoute);

  useEffect(() => {
    if (isTaskRoute) {
      setShouldShowSidebar(false);
    } else {
      const timer = setTimeout(() => setShouldShowSidebar(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isTaskRoute]);
  return shouldShowSidebar;
};
