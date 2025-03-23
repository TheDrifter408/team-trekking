import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { List } from '../../types/List';
import { ListItem } from '../../types/ListItem';
import { Input } from '@library/components';
import { ListChecks, Plus, X } from 'lucide-react';

interface CreateListProps {
  // Add props as needed
  onListAdd: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateList: FC<CreateListProps> = ({ onListAdd }) => {
  const [list, setList] = useState<List>({
    id: '0',
    name: '',
    description: '',
    parentId: '',
    parentType: 'space',
    items: [] as ListItem[],
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [newItemText, setNewItemText] = useState<string>('');

  // Handle adding a new list item
  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newItem: ListItem = {
        id: (list.items.length + 1).toString(),
        text: newItemText.trim(),
        completed: false,
        createdAt: new Date(),
      };

      setList({
        ...list,
        items: [...list.items, newItem],
      });

      setNewItemText('');
    }
  };

  // Handle pressing Enter to add item
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  // Handle removing an item from the list
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...list.items];
    updatedItems.splice(index, 1);
    setList({ ...list, items: updatedItems });
  };

  // Toggle item completion status
  const handleToggleComplete = (index: number) => {
    const updatedItems = [...list.items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setList({ ...list, items: updatedItems });
  };

  return (
    <form onSubmit={onListAdd} className="w-[100%] space-y-4 border-none">
      <div className="flex justify-between">
        <div className="items-left flex flex-col gap-2 w-1/2 pr-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold">
              List Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={list.name}
              onChange={(e) => setList({ ...list, name: e.target.value })}
              className="rounded-md border p-2 w-full"
              placeholder="Enter list name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Parent Type</label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${
                  list.parentType === 'space'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() =>
                  setList({ ...list, parentType: 'space', parentId: '' })
                }
              >
                Space
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${
                  list.parentType === 'folder'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() =>
                  setList({ ...list, parentType: 'folder', parentId: '' })
                }
              >
                Folder
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="parent" className="mb-2 font-semibold">
              Parent {list.parentType === 'space' ? 'Space' : 'Folder'}
            </label>
            <select
              id="parent"
              name="parent"
              value={list.parentId}
              onChange={(e) => setList({ ...list, parentId: e.target.value })}
              className="rounded-md border p-2"
            >
              <option value="" disabled>
                Select a {list.parentType}
              </option>
              {list.parentType === 'space' ? (
                <>
                  <option value="space1">Space 1</option>
                  <option value="space2">Space 2</option>
                  <option value="space3">Space 3</option>
                </>
              ) : (
                <>
                  <option value="folder1">Folder 1</option>
                  <option value="folder2">Folder 2</option>
                  <option value="folder3">Folder 3</option>
                </>
              )}
              {/* Add dynamic options as needed */}
            </select>
          </div>
        </div>

        <div className="flex flex-col w-1/2 pl-2">
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={list.description}
              onChange={(e) =>
                setList({ ...list, description: e.target.value })
              }
              className="rounded-md border p-2 h-20"
              placeholder="Enter list description"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="isArchived" className="mb-2 font-semibold">
              Status
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isArchived"
                name="isArchived"
                checked={list.isArchived}
                onChange={(e) =>
                  setList({ ...list, isArchived: e.target.checked })
                }
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="isArchived">Archive list</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="listItems" className="mb-2 font-semibold">
          List Items
        </label>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            id="listItems"
            name="listItems"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm rounded-md border p-2"
            placeholder="Add a new item and press Enter or Add"
          />
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center rounded-md mb-3 bg-blue-500 p-2 text-white"
          >
            <Plus className="h-4 w-4" />
            <span className="ml-1">Add</span>
          </button>
        </div>
      </div>

      {list.items.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          <div className="space-y-2 bg-gray-100 p-3 rounded-md">
            {list.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleComplete(index)}
                    className="mr-2 h-4 w-4"
                  />
                  <span
                    className={
                      item.completed ? 'line-through text-gray-500' : ''
                    }
                  >
                    {item.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};
