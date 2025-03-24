export const FolderCard = ({ folder }) => (
  <div className="folder-card bg-white p-5 rounded-lg shadow">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-lg">{folder.name}</h3>
      <span
        className="status-badge px-2 py-1 text-xs rounded"
        style={{
          backgroundColor: folder.statusColor || '#e2e8f0',
          color: '#1a202c',
        }}
      >
        {folder.status}
      </span>
    </div>

    <div className="folder-stats grid grid-cols-2 gap-3 mb-4">
      <div className="stat-item">
        <span className="text-gray-600 text-xs">Tasks</span>
        <p className="font-semibold">{folder.totalTasks}</p>
      </div>
      <div className="stat-item">
        <span className="text-gray-600 text-xs">Lists</span>
        <p className="font-semibold">{folder.listCount}</p>
      </div>
      <div className="stat-item">
        <span className="text-gray-600 text-xs">High Priority</span>
        <p className="font-semibold">{folder.highPriorityTasks}</p>
      </div>
      <div className="stat-item">
        <span className="text-gray-600 text-xs">Due Today</span>
        <p className="font-semibold">{folder.tasksDueToday}</p>
      </div>
    </div>

    <div className="progress-section mt-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">Progress</span>
        <span className="text-xs font-bold">{folder.averageProgress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${folder.averageProgress}%` }}
        ></div>
      </div>
    </div>

    <div className="completion-section mt-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">Completion</span>
        <span className="text-xs font-bold">
          {folder.completionPercentage}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${folder.completionPercentage}%` }}
        ></div>
      </div>
    </div>
  </div>
);
