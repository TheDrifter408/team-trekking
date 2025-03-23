import { FC, FormEvent, useState } from 'react';
import { CreateFolder as Folder } from '@/types/Props';
import { Input, Badge } from '@library/components';
import { createFolderColors } from '@/data/mockData.ts';
import { FolderOpen } from 'lucide-react';

interface CreateFolderProps {
  onFolderAdd: (e: FormEvent<HTMLFormElement>) => void;
}

const colors: { [key: string]: string } = createFolderColors;

const getFolderStatus = (color: string) => colors[color] || 'Unknown';

const getBadgeStyles = (color: string) => ({
  backgroundColor: color,
  color: '#fff',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '4px 12px',
  borderRadius: '4px',
});

export const CreateFolder: FC<CreateFolderProps> = ({ onFolderAdd }) => {
  const [folder, setFolder] = useState<Folder>({
    id: '0',
    name: '',
    description: '',
    color: '#6366f1', // Default indigo color
    parentSpaceId: '',
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
  });

  const handleColorChange = (color: string) => {
    setFolder({ ...folder, color });
  };

  return (
    <form onSubmit={onFolderAdd} className="w-[100%] space-y-4 border-none">
      <div className="flex justify-between">
        <div className="items-left flex flex-col gap-2 w-1/2 pr-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold">
              Folder Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={folder.name}
              onChange={(e) => setFolder({ ...folder, name: e.target.value })}
              className="rounded-md border p-2 w-full"
              placeholder="Enter folder name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="parentSpace" className="mb-2 font-semibold">
              Parent Space
            </label>
            <select
              id="parentSpace"
              name="parentSpace"
              value={folder.parentSpaceId}
              onChange={(e) =>
                setFolder({ ...folder, parentSpaceId: e.target.value })
              }
              className="rounded-md border p-2"
            >
              <option value="" disabled>
                Select a space
              </option>
              <option value="space1">Space 1</option>
              <option value="space2">Space 2</option>
              <option value="space3">Space 3</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="isPrivate" className="mb-2 font-semibold">
              Privacy
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPrivate"
                name="isPrivate"
                checked={folder.isPrivate}
                onChange={(e) =>
                  setFolder({ ...folder, isPrivate: e.target.checked })
                }
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="isPrivate">Make folder private</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 pl-2">
          <div className="flex flex-col">
            <label htmlFor="folderColor" className="mb-2 font-semibold">
              Folder Color
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(colors).map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full ${
                    folder.color === color
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="tags" className="mb-2 font-semibold">
              Tags
            </label>
            <Input
              type="text"
              id="tags"
              name="tags"
              placeholder="e.g., important, work, personal"
              value={folder.tags.join(', ')}
              onChange={(e) =>
                setFolder({
                  ...folder,
                  tags: e.target.value.split(', ').filter((tag) => tag),
                })
              }
              className="rounded-md border p-2 w-full"
            />
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <div className="flex items-center gap-2">
              <FolderOpen
                className="h-6 w-6 mr-2"
                style={{ color: folder.color }}
              />
              <span className="font-medium">
                {folder.name || 'Folder Preview'}
              </span>
              <Badge
                text={getFolderStatus(folder.color)}
                customStyles={getBadgeStyles(folder.color)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
