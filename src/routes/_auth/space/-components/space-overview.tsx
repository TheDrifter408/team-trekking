import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { FolderClosed } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Folder } from '@/types/request-response/workspace/ApiResponse';

interface Props {
  foldersData: Folder[];
}

export const SpaceOverview = ({ foldersData }: Props) => {
  const navigate = useNavigate();
  const colors = ['red', 'blue', 'gray', 'yellow'];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Folders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {foldersData.length > 0 &&
              foldersData.map((folder) => (
                <Card
                  key={folder.id || folder.name}
                  className="h-10 shadow-sm justify-center"
                  onClick={() => navigate({ to: '/folder' })}
                >
                  <CardContent className="p-2 flex items-center space-x-2 cursor-pointer">
                    <div className="flex-shrink-0">
                      <FolderClosed
                        color={colors[Number(folder.id) % 4]}
                        size={16}
                      />
                    </div>
                    <div className="text-sm truncate">{folder.name}</div>
                  </CardContent>
                </Card>
              ))}
            {foldersData.length > 0 &&
              foldersData.map((folder) => (
                <Card
                  key={folder.id || folder.name}
                  className="h-10 shadow-sm justify-center"
                  onClick={() => navigate({ to: '/folder' })}
                >
                  <CardContent className="p-2 flex items-center space-x-2 cursor-pointer">
                    <div className="flex-shrink-0">
                      <FolderClosed
                        color={colors[Number(folder.id) % 4]}
                        size={16}
                      />
                    </div>
                    <div className="text-sm truncate">{folder.name}</div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
