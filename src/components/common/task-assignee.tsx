import { useEffect, useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';
import { Member } from '@/types/request-response/workspace/ApiResponse.ts';
import {
  useDeleteTaskAssigneeMutation,
  useUpdateTaskAssigneeMutation,
} from '@/service/rtkQueries/taskQuery.ts';
import { handleMutation } from '@/lib/utils/utils.ts';

const TaskAssignee = ({
  taskId,
  selectedAssignee,
}: {
  taskId: string;
  selectedAssignee: Member[];
}) => {
  const { members } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState(selectedAssignee);
  const [updateTaskAssignee] = useUpdateTaskAssigneeMutation();
  const [deleteTaskAssignee] = useDeleteTaskAssigneeMutation();

  useEffect(() => {
    setSelectedAssignees(selectedAssignee);
  }, [selectedAssignee]);

  const filteredAssignees = members?.filter((assignee) =>
    assignee.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get initials from full name
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Function to get avatar content (image or initials)
  const getAvatarContent = (assignee: Member) => {
    const hasImage = assignee.user.image && assignee.user.image.trim() !== '';

    if (hasImage) {
      return (
        <img
          src={assignee.user.image}
          alt={assignee.user.fullName}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = getInitials(assignee.user.fullName);
            }
          }}
        />
      );
    } else {
      return getInitials(assignee.user.fullName);
    }
  };

  const handleAssigneeToggle = async (assignee: Member) => {
    const isSelected = selectedAssignees.some(
      (a: Member) => a.id === assignee.id
    );
    if (isSelected) {
      const { data } = await handleMutation(deleteTaskAssignee, {
        id: taskId,
        assigneeIds: [assignee.user.id],
      });
      if (data) updateAssigneeData(assignee);
    } else {
      const { data } = await handleMutation(updateTaskAssignee, {
        id: taskId,
        assigneeIds: [assignee.user.id],
      });
      if (data) updateAssigneeData(assignee);
    }
  };
  const updateAssigneeData = (assignee: Member) => {
    setSelectedAssignees((prev) => {
      const isSelected = prev.some(
        (a: Member) => a.user.id === assignee.user.id
      );
      if (isSelected) {
        return prev.filter((a: Member) => a.user.id !== assignee.user.id);
      } else {
        return [...prev, assignee];
      }
    });
  };

  const renderSelectedAssignees = () => {
    if (selectedAssignees.length === 0) return null;

    if (selectedAssignees.length <= 3) {
      return (
        <div className="flex">
          {selectedAssignees.map((assignee: Member) => (
            <div key={assignee.id} className="relative group">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
                {getAvatarContent(assignee)}
              </div>
              <div
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssigneeToggle(assignee);
                }}
              >
                <X size={10} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex">
          {selectedAssignees.slice(0, 2).map((assignee: Member) => (
            <div key={assignee.id} className="relative group">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
                {getAvatarContent(assignee)}
              </div>
              <div
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssigneeToggle(assignee);
                }}
              >
                <X size={10} className="text-white" />
              </div>
            </div>
          ))}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-gray-500 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
              +{selectedAssignees.length - 2}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {selectedAssignees.length > 0 ? (
          renderSelectedAssignees()
        ) : (
          <span className="text-[14px] text-gray-600">
            {selectedAssignees.length <= 0 && 'No assignee'}
          </span>
        )}
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Search */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Search or enter email..."
                className="w-full pl-8 pr-4 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Assignees List */}
          <div className="max-h-60 overflow-y-auto">
            <h3 className="pl-4 pt-2 pr-2 py-1 text-sm font-medium text-gray-600">
              Assignees
            </h3>
            {filteredAssignees?.map((assignee: Member) => (
              <div
                key={assignee.id}
                className="flex items-center justify-between pl-4 py-1 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleAssigneeToggle(assignee)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center">
                      {getAvatarContent(assignee)}
                    </div>
                    {selectedAssignees.some(
                      (a: Member) => a.user.id === assignee.user.id
                    ) && (
                      <div className="absolute -bottom-0.5 -right-2 w-3.5 h-3.5 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                        <X size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800">
                      {assignee.user.fullName}
                    </span>
                    {assignee.user.isActive && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={8} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskAssignee;
