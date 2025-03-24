import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Member, WorkspaceItem } from '@/types/ApiResponse';

interface WorkspaceCardProps {
  workspace: WorkspaceItem;
}

export const WorkspaceCard: FC<WorkspaceCardProps> = ({ workspace }) => {
  const navigate = useNavigate();

  const handlePressWorkspace = (workspaceId: number) => {
    navigate(`/workspace/${workspaceId}`, { state: { workspaceId } });
  };

  return (
    <div className="w-full cursor-pointer rounded-lg border bg-bg-secondary shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {/* Workspace Icon/Initials */}
          <div
            className="mr-4 flex items-center justify-center rounded-full bg-indigo-600 font-bold text-white"
            style={{ width: '50px', height: '50px' }}
          >
            {workspace.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          <div>
            <h5 className="mb-1  ">
              <div onClick={() => handlePressWorkspace(workspace.id)}>
                <span
                  className={'text-text-primary hover:underline font-medium'}
                >
                  {workspace.name}
                </span>
              </div>
            </h5>
            <p className="text-sm text-text-light">{workspace.description}</p>
          </div>
        </div>

        {/* Members Avatars */}
        <div className="flex">
          {workspace.members.length > 0 ? (
            workspace.members
              .slice(0, 4)
              .map((member: Member, index: number) => (
                <div
                  key={member.id}
                  className="flex items-center justify-center rounded-full bg-gray-50 text-text-inverted overflow-hidden border"
                  style={{
                    width: '30px',
                    height: '30px',
                    fontSize: '12px',
                    marginLeft: index > 0 ? '-9px' : '0',
                  }}
                >
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  )}
                </div>
              ))
          ) : (
            <div
              className="flex items-center justify-center rounded-full bg-gray-50 text-text-inverted"
              style={{
                width: '25px',
                height: '25px',
                fontSize: '10px',
                marginLeft: '0',
              }}
            >
              No Members
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
