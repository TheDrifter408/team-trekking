import { Input } from '@components/index';

interface CreateSpaceProps {
  spaceName: string;
  setSpaceName: (newSpaceName: string) => void;
}

export const CreateSpace = ({ spaceName, setSpaceName }: CreateSpaceProps) => {
  return (
    <div className="space-y-4 p-2">
      <div className="mb-4">
        <label className=" text-sm font-medium mb-1">Space Name</label>
        <Input
          placeholder="Enter space name"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
          className="w-full text-sm "
        />
      </div>
    </div>
  );
};

export default CreateSpace;
