import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn-ui/input.tsx';

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  placeHolder: string;
}

export const SearchBox = ({
  searchQuery,
  showSearch,
  setShowSearch,
  setSearchQuery,
  placeHolder = 'Search...',
}: Props) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        showSearch &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        event.target.closest('[data-search-btn]') === null
      ) {
        setShowSearch(false);
        setSearchQuery('');
      }
    };

    // Add event listener when search is shown
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <div
      className="flex relative w-full items-center px-3 py-2 border-b"
      ref={searchContainerRef}
    >
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search size={15} />
      </span>
      <Input
        ref={searchInputRef}
        type="text"
        placeholder={placeHolder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 pl-8 h-9"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
