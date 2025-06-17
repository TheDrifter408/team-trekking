import { useState } from 'react';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { mockFields } from '@/mock/columFields.ts';
import { Search } from 'lucide-react';

export const CreateField = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 relative">
      <div className="mb-2 sticky top-0 z-10 bg-white py-1">
        <Search className="absolute size-5 text-content-tertiary left-4 top-1/2 -translate-y-1/2" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-[36px] px-4 relative placeholder:text-lg pl-10 !text-lg"
          placeholder="Search for new or existing fields"
        />
      </div>
      <div className="px-1">
        {mockFields.map((data, i) => (
          <div key={i}>
            <div className="w-full text-base font-medium text-content-tertiary my-2">
              <span>{data.category}</span>
            </div>
            {data.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="py-[2px]">
                  <div className="hover:bg-secondary cursor-pointer py-2 px-1.5 rounded-sm gap-x-3 flex items-center">
                    <IconComponent className="size-4" />
                    <span className={'text-lg text-content-default'}>
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
