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
import { useLazyGetChecklistQuery } from '@/service/rtkQueries/taskQuery.ts';
import { LABEL } from '@/lib/constants';
import { CheckList } from '@/types/request-response/task/ApiResponse.ts';

const TaskCheckList = () => {
  // Replace with your actual hook
  const [getChecklist, { data: checklist, isLoading, error }] =
    useLazyGetChecklistQuery();

  const [checklists, setChecklists] = useState<CheckList[]>([]);
  const [showCompleted, setShowCompleted] = useState({});
  const [newItemText, setNewItemText] = useState({});
  const [isAddingItem, setIsAddingItem] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragOverChecklistId, setDragOverChecklistId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    if (checklist) {
      setChecklists(checklist);

      // Initialize state objects for each checklist
      const initialShowCompleted = {};
      const initialNewItemText = {};
      const initialIsAddingItem = {};

      checklist.forEach((checklist) => {
        initialShowCompleted[checklist.id] = true;
        initialNewItemText[checklist.id] = '';
        initialIsAddingItem[checklist.id] = false;
      });

      setShowCompleted(initialShowCompleted);
      setNewItemText(initialNewItemText);
      setIsAddingItem(initialIsAddingItem);
    }
  }, [checklist]);

  useEffect(() => {
    // Replace with actual API call
    getChecklist(1);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current?.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onToggleItem = (itemId, checklistId) => {
    setChecklists(
      checklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId ? { ...item, isDone: !item.isDone } : item
              ),
            }
          : checklist
      )
    );
  };

  const onAddNewItem = (checklistId) => {
    const text = newItemText[checklistId];
    if (text && text.trim()) {
      setChecklists(
        checklists.map((checklist) =>
          checklist.id === checklistId
            ? {
                ...checklist,
                items: [
                  ...checklist.items,
                  {
                    id: Date.now(),
                    content: text.trim(),
                    completed: false,
                  },
                ],
              }
            : checklist
        )
      );
      setNewItemText({ ...newItemText, [checklistId]: '' });
      setIsAddingItem({ ...isAddingItem, [checklistId]: false });
    }
  };

  const onHandleDragStart = (e, item, index, checklistId) => {
    setDraggedItem({ item, index, checklistId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const onHandleDragOver = (e, index, checklistId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
    setDragOverChecklistId(checklistId);
  };

  const onHandleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
      setDragOverChecklistId(null);
    }
  };

  const onHandleDrop = (e, dropIndex, dropChecklistId) => {
    e.preventDefault();

    if (
      draggedItem &&
      (draggedItem.index !== dropIndex ||
        draggedItem.checklistId !== dropChecklistId)
    ) {
      setChecklists(
        checklists.map((checklist) => {
          if (checklist.id === draggedItem.checklistId) {
            // Remove item from source checklist
            const newItems = [...checklist.items];
            const [movedItem] = newItems.splice(draggedItem.index, 1);

            if (draggedItem.checklistId === dropChecklistId) {
              // Same checklist - just reorder
              newItems.splice(dropIndex, 0, movedItem);
            }

            return { ...checklist, items: newItems };
          } else if (
            checklist.id === dropChecklistId &&
            draggedItem.checklistId !== dropChecklistId
          ) {
            // Add item to target checklist
            const newItems = [...checklist.items];
            newItems.splice(dropIndex, 0, draggedItem.item);
            return { ...checklist, items: newItems };
          }
          return checklist;
        })
      );
    }

    setDraggedItem(null);
    setDragOverIndex(null);
    setDragOverChecklistId(null);
  };

  const onHandleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    setDragOverChecklistId(null);
  };

  const toggleMenu = (itemId) => {
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  const onHandleMenuAction = (action, item, checklistId) => {
    switch (action) {
      case 'addItem':
        setActiveMenu(null);
        setIsAddingItem({ ...isAddingItem, [checklistId]: true });
        break;
      case 'rename':
        setActiveMenu(null);
        setEditingItem(item.id);
        setEditText(item.text);
        break;
      case 'delete':
        setChecklists(
          checklists.map((checklist) =>
            checklist.id === checklistId
              ? {
                  ...checklist,
                  items: checklist.items.filter((i) => i.id !== item.id),
                }
              : checklist
          )
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

  const onHandleEditSave = (itemId, checklistId) => {
    if (editText.trim()) {
      setChecklists(
        checklists.map((checklist) =>
          checklist.id === checklistId
            ? {
                ...checklist,
                items: checklist.items.map((item) =>
                  item.id === itemId
                    ? { ...item, content: editText.trim() }
                    : item
                ),
              }
            : checklist
        )
      );
    }
    setEditingItem(null);
    setEditText('');
  };

  const onHandleEditCancel = () => {
    setEditingItem(null);
    setEditText('');
  };

  const onHandleEditKeyPress = (e, itemId, checklistId) => {
    if (e.key === 'Enter') {
      onHandleEditSave(itemId, checklistId);
    } else if (e.key === 'Escape') {
      onHandleEditCancel();
    }
  };

  const onHandleKeyPress = (e, checklistId) => {
    if (e.key === 'Enter') {
      onAddNewItem(checklistId);
    } else if (e.key === 'Escape') {
      setIsAddingItem({ ...isAddingItem, [checklistId]: false });
      setNewItemText({ ...newItemText, [checklistId]: '' });
    }
  };

  const getCompletedCount = (items) =>
    items.filter((item) => item.isDone).length;
  const getTotalCount = (items) => items.length;

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full mx-auto py-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading checklists...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full mx-auto py-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading checklists: {error}</div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!checklists || checklists.length === 0) {
    return (
      <div className="w-full mx-auto py-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">No checklists found</div>
        </div>
      </div>
    );
  }

  const totalCompletedItems = checklists.reduce(
    (acc, checklist) => acc + getCompletedCount(checklist.items),
    0
  );
  const totalItems = checklists.reduce(
    (acc, checklist) => acc + getTotalCount(checklist.items),
    0
  );

  return (
    <div className="w-full mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            {LABEL.CHECKLISTS}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all duration-300"
                style={{
                  width: `${totalItems > 0 ? (totalCompletedItems / totalItems) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">
              {totalCompletedItems}/{totalItems}
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

      {/* Multiple Checklists */}
      {checklists.map((checklist) => {
        const completedCount = getCompletedCount(checklist.items);
        const totalCount = getTotalCount(checklist.items);
        const visibleItems = showCompleted[checklist.id]
          ? checklist.items
          : checklist.items.filter((item) => !item.isDone);

        return (
          <div key={checklist.id} className="rounded-lg mb-4 border">
            <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
              <h2 className="text-lg font-medium text-gray-900">
                {checklist.title}{' '}
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
                  ${draggedItem?.index === index && draggedItem?.checklistId === checklist.id ? 'opacity-50' : ''}
                  ${dragOverIndex === index && dragOverChecklistId === checklist.id ? 'bg-blue-50 border-t-2 border-blue-300' : 'hover:bg-gray-50'}
                  ${index !== visibleItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                  draggable
                  onDragStart={(e) =>
                    onHandleDragStart(e, item, index, checklist.id)
                  }
                  onDragOver={(e) => onHandleDragOver(e, index, checklist.id)}
                  onDragLeave={onHandleDragLeave}
                  onDrop={(e) => onHandleDrop(e, index, checklist.id)}
                  onDragEnd={onHandleDragEnd}
                >
                  <button className="flex-shrink-0 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => onToggleItem(item.id, checklist.id)}
                    className="flex-shrink-0"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.isDone
                          ? 'bg-gray-900 border-gray-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {item.isDone && (
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
                      onKeyDown={(e) =>
                        onHandleEditKeyPress(e, item.id, checklist.id)
                      }
                      onBlur={() => onHandleEditSave(item.id, checklist.id)}
                      className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 transition-all select-none ${
                        item.isDone
                          ? 'text-gray-400 line-through'
                          : 'text-gray-700'
                      }`}
                    >
                      {item.content}
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
                            onClick={() =>
                              onHandleMenuAction('addItem', item, checklist.id)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                            {LABEL.ADD_ITEM}
                          </button>
                          <button
                            onClick={() =>
                              onHandleMenuAction('rename', item, checklist.id)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit3 className="w-4 h-4" />
                            {LABEL.RENAME}
                          </button>
                          <button
                            onClick={() =>
                              onHandleMenuAction('assign', item, checklist.id)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <User className="w-4 h-4" />
                            {LABEL.ASSIGN_TO}
                          </button>
                          <button
                            onClick={() =>
                              onHandleMenuAction('delete', item, checklist.id)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            {LABEL.DELETE}
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
              {isAddingItem[checklist.id] ? (
                <div className="flex items-center gap-3 p-2 rounded-md">
                  <div className="w-4 h-4 flex-shrink-0"></div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  <input
                    type="text"
                    value={newItemText[checklist.id] || ''}
                    onChange={(e) =>
                      setNewItemText({
                        ...newItemText,
                        [checklist.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => onHandleKeyPress(e, checklist.id)}
                    onBlur={() =>
                      newItemText[checklist.id]?.trim()
                        ? onAddNewItem(checklist.id)
                        : setIsAddingItem({
                            ...isAddingItem,
                            [checklist.id]: false,
                          })
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
                  onClick={() =>
                    setIsAddingItem({ ...isAddingItem, [checklist.id]: true })
                  }
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

            {/* Toggle completed items for this checklist */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() =>
                  setShowCompleted({
                    ...showCompleted,
                    [checklist.id]: !showCompleted[checklist.id],
                  })
                }
                className="px-4 py-1 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {showCompleted[checklist.id]
                  ? 'Hide completed'
                  : `${completedCount} Completed`}
              </button>
            </div>
          </div>
        );
      })}

      {/* Add new checklist button */}
      <div className="mt-6 flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add checklist</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Use Template</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCheckList;
