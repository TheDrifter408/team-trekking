import { useState } from 'react';
import { Search, X, Check } from 'lucide-react';

const AssigneeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState([]);

  const assignees = [
    { id: 1, name: 'Me', avatar: 'MH', isOnline: true },
    { id: 2, name: 'Samrat Biswas', avatar: 'SB', isOnline: true },
    { id: 3, name: 'Noor Ullah Al Noor', avatar: 'NA', isOnline: true },
    {
      id: 4,
      name: 'Jawahiir Nabhan',
      avatar: 'JN',
      isOnline: false,
      verified: true,
    },
    { id: 5, name: 'Khairul Hasan', avatar: 'KH', isOnline: false },
    { id: 6, name: 'Tarun', avatar: 'T', isOnline: false },
    {
      id: 7,
      name: 'Rahad Kabir',
      avatar: 'RK',
      isOnline: false,
      verified: true,
    },
    {
      id: 8,
      name: 'Yiafee Khan',
      avatar: 'YK',
      isOnline: false,
      verified: true,
    },
  ];

  const filteredAssignees = assignees.filter((assignee) =>
    assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssigneeToggle = (assignee) => {
    setSelectedAssignees((prev) => {
      const isSelected = prev.some((a) => a.id === assignee.id);
      if (isSelected) {
        return prev.filter((a) => a.id !== assignee.id);
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
          {selectedAssignees.map((assignee) => (
            <div key={assignee.id} className="relative">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
                {assignee.avatar}
              </div>
              <div
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors z-10"
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
          {selectedAssignees.slice(0, 2).map((assignee) => (
            <div key={assignee.id} className="relative">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
                {assignee.avatar}
              </div>
              <div
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors z-10"
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
            {filteredAssignees.map((assignee) => (
              <div
                key={assignee.id}
                className="flex items-center justify-between pl-4 py-1 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleAssigneeToggle(assignee)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center">
                      {assignee.avatar}
                    </div>
                    {selectedAssignees.some((a) => a.id === assignee.id) && (
                      <div className="absolute -bottom-0.5 -right-2 w-3.5 h-3.5 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                        <X size={10} className="text-white" />
                      </div>
                    )}
                    {!selectedAssignees.some((a) => a.id === assignee.id) &&
                      assignee.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    {!selectedAssignees.some((a) => a.id === assignee.id) &&
                      !assignee.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                      )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800">
                      {assignee.name}
                    </span>
                    {assignee.verified && (
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

export default AssigneeSelector;
