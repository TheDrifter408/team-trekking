import {
  useCreateSpaceMutation,
  useCreateFolderMutation,
  useCreateListMutation,
} from '@store/services/main.ts';
import { useStore } from '@/store/zustand';
import { Space, Folder } from '@/types/ApiResponse.ts';

export const useData = () => {
  const [createSpace] = useCreateSpaceMutation();
  const [createFolder] = useCreateFolderMutation();
  const [createList] = useCreateListMutation();
  const { workspaceData, setWorkspaceData } = useStore();

  const handleCreateSpace = async (workspaceId: number, spaceName: string) => {
    try {
      const response = await createSpace({ workspaceId, spaceName }).unwrap();

      const newSpace: Space = response;
      const updatedWorkspaceData = [...workspaceData];
      updatedWorkspaceData.push({ space: newSpace });

      setWorkspaceData(updatedWorkspaceData);
    } catch (err) {
      console.error('Failed to create space:', err);
    }
  };

  const handleCreateFolder = async (
    spaceId: number,
    folderName: string,
    color?: string
  ) => {
    try {
      const response = await createFolder({
        spaceId,
        folderName,
        color,
      }).unwrap();

      // Create a deep copy of the workspace data to avoid direct mutation
      const updatedWorkspaceData = JSON.parse(JSON.stringify(workspaceData));

      // Find the space with the matching ID
      const spaceIndex = updatedWorkspaceData.findIndex(
        (item: any) => item.space.id === spaceId
      );

      if (spaceIndex !== -1) {
        // Add the new folder to the space's folders array
        const newFolder: Folder = response;

        // Initialize folders array if it doesn't exist
        if (!updatedWorkspaceData[spaceIndex].space.folders) {
          updatedWorkspaceData[spaceIndex].space.folders = [];
        }

        updatedWorkspaceData[spaceIndex].space.folders.push(newFolder);

        // Update the workspace data
        setWorkspaceData(updatedWorkspaceData);
      } else {
        console.error(`Space with ID ${spaceId} not found`);
      }
    } catch (err) {
      console.error('Failed to create folder:', err);
    }
  };

  const handleCreateList = async (
    parentId: number,
    parentType: string,
    listName: string
  ) => {
    const response = await createList({
      parentId,
      parentType,
      listName,
    }).unwrap();

    const newList = response;

    // Create a deep copy of the workspace data to avoid direct mutation
    const updatedWorkspaceData = JSON.parse(JSON.stringify(workspaceData));

    if (parentType === 'space') {
      for (let i = 0; i < updatedWorkspaceData.length; i++) {
        const spaceData = updatedWorkspaceData[i].space;
        if (spaceData.id === parentId) {
          updatedWorkspaceData[i].space.lists.push(newList);
          setWorkspaceData(updatedWorkspaceData);
          break;
        }
      }
    } else if (parentType === 'folder') {
      for (let i = 0; i < updatedWorkspaceData.length; i++) {
        const folders = updatedWorkspaceData[i].space.folders;
        for (let j = 0; j < folders.length; j++) {
          const folder = folders[j];
          if (folder.id === parentId) {
            updatedWorkspaceData[i].space.folders[j].lists.push(newList);
            setWorkspaceData(updatedWorkspaceData);
            break;
          }
        }
      }
    }
  };

  return {
    handleCreateSpace,
    handleCreateFolder,
    handleCreateList,
  };
};
