import { useState, useRef, useEffect } from 'react';
import {
  Plus,
  MoreHorizontal,
  Maximize2,
  User,
  GripVertical,
  Edit3,
  Trash2,
} from 'lucide-react';

const TaskCheckList = () => {
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      name: 'Checklist',
      items: [
        { id: 1, text: 'Implement workspace creating api', completed: true },
        {
          id: 2,
          text: 'Ensure fetching data from previous dailog',
          completed: true,
        },
        {
          id: 3,
          text: 'After creating workspace update left sidebar with workspace name',
          completed: false,
        },
        { id: 4, text: 'Authorized request', completed: true },
      ],
    },
  ]);

  const [showCompleted, setShowCompleted] = useState(true);
  const [newItemText, setNewItemText] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState('');
  const menuRef = useRef(null);

  const currentChecklist = checklists[0];
  const completedCount = currentChecklist.items.filter(
    (item) => item.completed
  ).length;
  const totalCount = currentChecklist.items.length;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleItem = (itemId) => {
    setChecklists(
      checklists.map((checklist) => ({
        ...checklist,
        items: checklist.items.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        ),
      }))
    );
  };

  const addNewItem = () => {
    if (newItemText.trim()) {
      setChecklists(
        checklists.map((checklist) => ({
          ...checklist,
          items: [
            ...checklist.items,
            {
              id: Date.now(),
              text: newItemText.trim(),
              completed: false,
            },
          ],
        }))
      );
      setNewItemText('');
      setIsAddingItem(false);
    }
  };

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    // Only clear drag over index if we're leaving the container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem && draggedItem.index !== dropIndex) {
      setChecklists(
        checklists.map((checklist) => {
          const newItems = [...checklist.items];
          const [movedItem] = newItems.splice(draggedItem.index, 1);
          newItems.splice(dropIndex, 0, movedItem);
          return { ...checklist, items: newItems };
        })
      );
    }

    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const toggleMenu = (itemId) => {
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  const handleMenuAction = (action, item) => {
    switch (action) {
      case 'addItem':
        setActiveMenu(null);
        setIsAddingItem(true);
        break;
      case 'rename':
        setActiveMenu(null);
        setEditingItem(item.id);
        setEditText(item.text);
        break;
      case 'delete':
        setChecklists(
          checklists.map((checklist) => ({
            ...checklist,
            items: checklist.items.filter((i) => i.id !== item.id),
          }))
        );
        setActiveMenu(null);
        break;
      case 'assign':
        setActiveMenu(null);
        // Handle assign action
        break;
      default:
        break;
    }
  };

  const handleEditSave = (itemId) => {
    if (editText.trim()) {
      setChecklists(
        checklists.map((checklist) => ({
          ...checklist,
          items: checklist.items.map((item) =>
            item.id === itemId ? { ...item, text: editText.trim() } : item
          ),
        }))
      );
    }
    setEditingItem(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingItem(null);
    setEditText('');
  };

  const handleEditKeyPress = (e, itemId) => {
    if (e.key === 'Enter') {
      handleEditSave(itemId);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNewItem();
    } else if (e.key === 'Escape') {
      setIsAddingItem(false);
      setNewItemText('');
    }
  };

  const visibleItems = showCompleted
    ? currentChecklist.items
    : currentChecklist.items.filter((item) => !item.completed);

  return (
    <div className="w-full mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">Checklists</h1>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Maximize2 className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Checklist Card */}
      <div className="rounded-lg mb-4 border">
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
          <h2 className="text-lg font-medium text-gray-900">
            {currentChecklist.name}{' '}
            <span className="text-gray-400 text-sm">
              ({completedCount}/{totalCount})
            </span>
          </h2>
        </div>

        <div>
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 group p-2 pr-4 transition-all duration-200 relative
              ${draggedItem?.index === index ? 'opacity-50' : ''}
              ${dragOverIndex === index ? 'bg-blue-50 border-t-2 border-blue-300' : 'hover:bg-gray-50'}
              ${index !== visibleItems.length - 1 ? 'border-b border-gray-100' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, item, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <button className="flex-shrink-0 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => toggleItem(item.id)}
                className="flex-shrink-0"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-gray-900 border-gray-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {item.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>

              {editingItem === item.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyPress(e, item.id)}
                  onBlur={() => handleEditSave(item.id)}
                  className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-1 transition-all select-none ${
                    item.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  {item.text}
                </span>
              )}

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className="relative"
                  ref={activeMenu === item.id ? menuRef : null}
                >
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>

                  {activeMenu === item.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                      <button
                        onClick={() => handleMenuAction('addItem', item)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </button>
                      <button
                        onClick={() => handleMenuAction('rename', item)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Edit3 className="w-4 h-4" />
                        Rename
                      </button>
                      <button
                        onClick={() => handleMenuAction('assign', item)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        Assign to
                      </button>
                      <button
                        onClick={() => handleMenuAction('delete', item)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <User className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}

          {/* Add new item */}
          {isAddingItem ? (
            <div className="flex items-center gap-3 p-2 rounded-md">
              <div className="w-4 h-4 flex-shrink-0"></div>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={() =>
                  newItemText.trim() ? addNewItem() : setIsAddingItem(false)
                }
                placeholder="New checklist item"
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <User className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingItem(true)}
              className="flex items-center gap-3 group py-3 pl-4 pr-5 text-gray-400 hover:text-gray-600 transition-colors w-full rounded-md hover:bg-gray-100"
            >
              <div className="w-4 h-4 flex-shrink-0"></div>
              <Plus className="w-4 h-4" />
              <span className="text-sm">New checklist item</span>
              <div className="flex-1"></div>
              <User className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {/* Toggle completed items */}
      <div className="mt-4 border-gray-200">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="px-4 py-1 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {showCompleted ? 'Hide completed' : `${completedCount} Completed`}
        </button>
      </div>
    </div>
  );
};

export default TaskCheckList;
