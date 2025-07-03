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
import { LABEL } from '@/lib/constants';
import {
  useCreateCheckListMutation,
  useLazyGetChecklistQuery,
  useCreateChecklistItemMutation,
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
  useDeleteChecklistMutation,
  useUpdateChecklistMutation, // Added update checklist mutation
} from '@/service/rtkQueries/taskQuery.ts';
import { handleMutation } from '@/lib/utils/utils.ts';

interface CheckListItem {
  id: number;
  content: string;
  isDone: boolean;
  isActive: boolean;
}

interface CheckList {
  id: number;
  title: string;
  items: CheckListItem[];
}

interface DraggedItem {
  item: CheckListItem;
  index: number;
  checklistId: number;
}

interface ShowCompletedState {
  [key: number]: boolean;
}

interface NewItemTextState {
  [key: number]: string;
}

interface IsAddingItemState {
  [key: number]: boolean;
}

interface TaskCheckListProps {
  taskId?: number;
}

const TaskCheckList = ({ taskId = 1 }: TaskCheckListProps) => {
  const [getChecklist, { data: checklistsData }] = useLazyGetChecklistQuery();
  const [createCheckList] = useCreateCheckListMutation();
  const [deleteChecklist] = useDeleteChecklistMutation();
  const [updateChecklist] = useUpdateChecklistMutation();
  const [createChecklistItem] = useCreateChecklistItemMutation();
  const [updateChecklistItem] = useUpdateChecklistItemMutation();
  const [deleteChecklistItem] = useDeleteChecklistItemMutation();

  const [checklists, setChecklists] = useState<CheckList[]>([]);
  const [showCompleted, setShowCompleted] = useState<ShowCompletedState>({});
  const [newItemText, setNewItemText] = useState<NewItemTextState>({});
  const [isAddingItem, setIsAddingItem] = useState<IsAddingItemState>({});
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverChecklistId, setDragOverChecklistId] = useState<number | null>(
    null
  );
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeChecklistMenu, setActiveChecklistMenu] = useState<number | null>(
    null
  );
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [editingChecklistId, setEditingChecklistId] = useState<number | null>(
    null
  );
  const [editingChecklistTitle, setEditingChecklistTitle] =
    useState<string>('');
  const [isCreatingChecklist, setIsCreatingChecklist] =
    useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const checklistMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChecklist(1);
  }, [getChecklist]);

  // Update checklists when data is fetched
  useEffect(() => {
    // Replace with actual RTK Query data
    if (checklistsData) {
      setChecklists(checklistsData);
    }
  }, [checklistsData]);

  useEffect(() => {
    // Initialize state objects for each checklist
    const initialShowCompleted: ShowCompletedState = {};
    const initialNewItemText: NewItemTextState = {};
    const initialIsAddingItem: IsAddingItemState = {};

    checklists.forEach((checklistItem) => {
      initialShowCompleted[checklistItem.id] = true;
      initialNewItemText[checklistItem.id] = '';
      initialIsAddingItem[checklistItem.id] = false;
    });

    setShowCompleted(initialShowCompleted);
    setNewItemText(initialNewItemText);
    setIsAddingItem(initialIsAddingItem);
  }, [checklists]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (
        checklistMenuRef.current &&
        !checklistMenuRef.current?.contains(event.target as Node)
      ) {
        setActiveChecklistMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onToggleItem = async (
    checkListItem: CheckListItem,
    checklistId: number
  ): Promise<void> => {
    const { data } = await handleMutation(updateChecklistItem, {
      id: checkListItem.id,
      content: checkListItem.content,
      isDone: !checkListItem.isDone,
    });
    if (data) {
      setChecklists(
        checklists.map((checklist) =>
          checklist.id === checklistId
            ? {
                ...checklist,
                items: checklist.items.map((item) =>
                  item.id === checkListItem.id
                    ? { ...item, isDone: !item.isDone }
                    : item
                ),
              }
            : checklist
        )
      );
    }
  };

  const onAddNewItem = async (checklistId: number): Promise<void> => {
    const text = newItemText[checklistId];
    if (text && text.trim()) {
      try {
        const { data } = await handleMutation(createChecklistItem, {
          content: text.trim(),
          isDone: false,
          checklistId: checklistId,
        });

        if (data) {
          // Refresh the checklist data to get the updated items
          getChecklist(taskId);

          // Reset the input state
          setNewItemText({ ...newItemText, [checklistId]: '' });
          setIsAddingItem({ ...isAddingItem, [checklistId]: false });
        }
      } catch (error) {
        console.error('Failed to create checklist item:', error);
        // Handle error - you might want to show a toast or error message
      }
    }
  };

  const onHandleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: CheckListItem,
    index: number,
    checklistId: number
  ): void => {
    setDraggedItem({ item, index, checklistId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const onHandleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    checklistId: number
  ): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
    setDragOverChecklistId(checklistId);
  };

  const onHandleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
      setDragOverChecklistId(null);
    }
  };

  const onHandleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
    dropChecklistId: number
  ): void => {
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

  const onHandleDragEnd = (): void => {
    setDraggedItem(null);
    setDragOverIndex(null);
    setDragOverChecklistId(null);
  };

  const toggleMenu = (itemId: number): void => {
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  const toggleChecklistMenu = (checklistId: number): void => {
    setActiveChecklistMenu(
      activeChecklistMenu === checklistId ? null : checklistId
    );
  };

  const onHandleMenuAction = async (
    action: string,
    item: CheckListItem,
    checklistId: number
  ): Promise<void> => {
    switch (action) {
      case 'addItem':
        setActiveMenu(null);
        setIsAddingItem({ ...isAddingItem, [checklistId]: true });
        break;
      case 'rename':
        setActiveMenu(null);
        setEditingItem(item.id);
        setEditText(item.content);
        break;
      case 'delete':
        setActiveMenu(null);
        try {
          const { data } = await handleMutation(deleteChecklistItem, item.id);
          if (data) {
            // Update local state by removing the item
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
          }
        } catch {
          // Handle error - you might want to show a toast or error message
        }
        break;
      case 'assign':
        setActiveMenu(null);
        // Handle assign action
        break;
      default:
        break;
    }
  };

  const onHandleChecklistMenuAction = async (
    action: string,
    checklistId: number
  ): Promise<void> => {
    switch (action) {
      case 'delete':
        setActiveChecklistMenu(null);
        try {
          const { data } = await handleMutation(deleteChecklist, checklistId);
          if (data) {
            // Update local state by removing the checklist
            setChecklists(checklists.filter((c) => c.id !== checklistId));

            // Clean up related state
            const newShowCompleted = { ...showCompleted };
            const newNewItemText = { ...newItemText };
            const newIsAddingItem = { ...isAddingItem };

            delete newShowCompleted[checklistId];
            delete newNewItemText[checklistId];
            delete newIsAddingItem[checklistId];

            setShowCompleted(newShowCompleted);
            setNewItemText(newNewItemText);
            setIsAddingItem(newIsAddingItem);
          }
        } catch (error) {
          console.error('Failed to delete checklist:', error);
          // Handle error - you might want to show a toast or error message
        }
        break;
      default:
        break;
    }
  };

  const onHandleEditSave = async (
    checkListItem: CheckListItem,
    checklistId: number
  ): Promise<void> => {
    if (editText.trim()) {
      try {
        // Call the API to update the item
        const { data } = await handleMutation(updateChecklistItem, {
          id: checkListItem.id,
          content: editText.trim(),
          isDone: checkListItem.isDone,
        });

        if (data) {
          // Update local state
          setChecklists(
            checklists.map((checklist) =>
              checklist.id === checklistId
                ? {
                    ...checklist,
                    items: checklist.items.map((item) =>
                      item.id === checkListItem.id
                        ? { ...item, content: editText.trim() }
                        : item
                    ),
                  }
                : checklist
            )
          );
        }
      } catch (error) {
        console.error('Failed to update checklist item:', error);
        // Handle error - you might want to show a toast or error message
      }
    }
    setEditingItem(null);
    setEditText('');
  };

  const onHandleEditCancel = (): void => {
    setEditingItem(null);
    setEditText('');
  };

  const onHandleEditKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: CheckListItem,
    checklistId: number
  ): void => {
    if (e.key === 'Enter') {
      onHandleEditSave(item, checklistId);
    } else if (e.key === 'Escape') {
      onHandleEditCancel();
    }
  };

  const onHandleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    checklistId: number
  ): void => {
    if (e.key === 'Enter') {
      onAddNewItem(checklistId);
    } else if (e.key === 'Escape') {
      setIsAddingItem({ ...isAddingItem, [checklistId]: false });
      setNewItemText({ ...newItemText, [checklistId]: '' });
    }
  };

  const getCompletedCount = (items: CheckListItem[]): number =>
    items.filter((item) => item.isDone).length;
  const getTotalCount = (items: CheckListItem[]): number => items.length;

  const onCreateNewChecklist = async (): Promise<void> => {
    setIsCreatingChecklist(true);
    try {
      // For demo purposes, creating locally
      const newId = Date.now();
      const newChecklist: CheckList = {
        id: newId,
        title: '',
        items: [],
      };

      setChecklists([...checklists, newChecklist]);
      setEditingChecklistId(newId);
      setEditingChecklistTitle('');
    } catch (error) {
      console.error('Failed to create checklist:', error);
    } finally {
      setIsCreatingChecklist(false);
    }
  };

  const onSaveChecklistTitle = async (checklistId: number): Promise<void> => {
    if (editingChecklistTitle.trim()) {
      try {
        // If this is a new checklist (no existing title), create it via API
        const existingChecklist = checklists.find((c) => c.id === checklistId);

        if (!existingChecklist?.title) {
          // This is a new checklist, create it
          const { data } = await handleMutation(createCheckList, {
            title: editingChecklistTitle.trim(),
            taskId: taskId,
          });

          if (data) {
            // Update local state with the new checklist data from API
            setChecklists(
              checklists.map((checklist) =>
                checklist.id === checklistId
                  ? { ...checklist, title: editingChecklistTitle.trim() }
                  : checklist
              )
            );
            getChecklist(taskId);
          }
        } else {
          // This is updating an existing checklist title
          const { data } = await handleMutation(updateChecklist, {
            id: checklistId,
            title: editingChecklistTitle.trim(),
          });

          if (data) {
            // Update local state
            setChecklists(
              checklists.map((checklist) =>
                checklist.id === checklistId
                  ? { ...checklist, title: editingChecklistTitle.trim() }
                  : checklist
              )
            );
          }
        }
      } catch (error) {
        console.error('Failed to save checklist title:', error);
        // Handle error
      }
    } else {
      // If title is empty, remove the checklist
      setChecklists(checklists.filter((c) => c.id !== checklistId));
    }
    setEditingChecklistId(null);
    setEditingChecklistTitle('');
  };

  const onHandleChecklistTitleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    checklistId: number
  ): void => {
    if (e.key === 'Enter') {
      onSaveChecklistTitle(checklistId);
    } else if (e.key === 'Escape') {
      // Remove the checklist if escape is pressed
      setChecklists(checklists.filter((c) => c.id !== checklistId));
      setEditingChecklistId(null);
      setEditingChecklistTitle('');
    }
  };

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
          <button
            onClick={onCreateNewChecklist}
            disabled={isCreatingChecklist}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
          >
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
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b">
              {editingChecklistId === checklist.id ? (
                <input
                  type="text"
                  value={editingChecklistTitle}
                  onChange={(e) => setEditingChecklistTitle(e.target.value)}
                  onKeyDown={(e) =>
                    onHandleChecklistTitleKeyPress(e, checklist.id)
                  }
                  onBlur={() => onSaveChecklistTitle(checklist.id)}
                  placeholder="Checklist title"
                  className="text-lg font-medium bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              ) : (
                <h2
                  className="text-lg font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    setEditingChecklistId(checklist.id);
                    setEditingChecklistTitle(checklist.title);
                  }}
                >
                  {checklist.title || 'Untitled Checklist'}{' '}
                  <span className="text-gray-400 text-sm">
                    ({completedCount}/{totalCount})
                  </span>
                </h2>
              )}

              <div
                className="relative"
                ref={
                  activeChecklistMenu === checklist.id ? checklistMenuRef : null
                }
              >
                <button
                  onClick={() => toggleChecklistMenu(checklist.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>

                {activeChecklistMenu === checklist.id && (
                  <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() =>
                        onHandleChecklistMenuAction('delete', checklist.id)
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
                    onClick={() => onToggleItem(item, checklist.id)}
                    className="flex-shrink-0"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
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
                        onHandleEditKeyPress(e, item, checklist.id)
                      }
                      onBlur={() => onHandleEditSave(item, checklist.id)}
                      className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 text-sm transition-all select-none ${
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
                    onBlur={() => {
                      if (newItemText[checklist.id]?.trim()) {
                        onAddNewItem(checklist.id);
                      } else {
                        setIsAddingItem({
                          ...isAddingItem,
                          [checklist.id]: false,
                        });
                      }
                    }}
                    placeholder="New checklist item"
                    className="flex-1 text-sm bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
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
                  className="flex items-center gap-3 group py-3 pl-2 pr-5 text-gray-400 hover:text-gray-600 transition-colors w-full rounded-md hover:bg-gray-50"
                >
                  <div className="w-4 h-4 flex-shrink-0"></div>
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">{LABEL.NEW_CHECKLIST_ITEM}</span>
                  <div className="flex-1"></div>
                  <User className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Toggle completed items for this checklist */}
            {checklist.items.length > 0 && (
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
                    ? `${LABEL.HIDE_COMPLETED}`
                    : `${completedCount} ${LABEL.COMPLETED}`}
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom buttons for additional actions */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={onCreateNewChecklist}
          disabled={isCreatingChecklist}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>
            {isCreatingChecklist ? 'Creating...' : LABEL.ADD_CHECKLIST}
          </span>
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
          <span>{LABEL.USE_TEMPLATE}</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCheckList;
