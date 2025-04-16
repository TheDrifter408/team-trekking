import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Ban,
  Bell,
  Book,
  Briefcase,
  Calendar,
  Camera,
  Cloud,
  Coffee,
  Database,
  FileText,
  Gift,
  Globe,
  Heart,
  Home,
  Layers,
  Lightbulb,
  Mail,
  Map,
  Music,
  Palette,
  Rocket,
  Settings,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

interface Props {
  // Dialog state
  createSpaceOpen: boolean;
  setCreateSpaceOpen: (open: boolean) => void;

  // Form state values
  spaceName: string;
  setSpaceName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  selectedIcon: React.ReactNode | null;
  setSelectedIcon: (icon: React.ReactNode | null) => void;
  privateAccess: boolean;
  setPrivateAccess: (isPrivate: boolean) => void;

  // Derived state (can be computed in parent or passed directly)
  initials: string;

  // Submit handler
  onCreateSpace: () => void;
}

const iconOptions = [
  { name: 'Briefcase', icon: <Briefcase size={20} /> },
  { name: 'Users', icon: <Users size={20} /> },
  { name: 'Globe', icon: <Globe size={20} /> },
  { name: 'Star', icon: <Star size={20} /> },
  { name: 'Home', icon: <Home size={20} /> },
  { name: 'Book', icon: <Book size={20} /> },
  { name: 'Rocket', icon: <Rocket size={20} /> },
  { name: 'Heart', icon: <Heart size={20} /> },
  { name: 'Calendar', icon: <Calendar size={20} /> },
  { name: 'Settings', icon: <Settings size={20} /> },
  { name: 'Map', icon: <Map size={20} /> },
  { name: 'Mail', icon: <Mail size={20} /> },
  { name: 'Zap', icon: <Zap size={20} /> },
  { name: 'Coffee', icon: <Coffee size={20} /> },
  { name: 'Cloud', icon: <Cloud size={20} /> },
  { name: 'Music', icon: <Music size={20} /> },
  { name: 'Camera', icon: <Camera size={20} /> },
  { name: 'Palette', icon: <Palette size={20} /> },
  { name: 'Gift', icon: <Gift size={20} /> },
  { name: 'Trophy', icon: <Trophy size={20} /> },
  { name: 'Lightbulb', icon: <Lightbulb size={20} /> },
  { name: 'Bell', icon: <Bell size={20} /> },
  { name: 'Layers', icon: <Layers size={20} /> },
  { name: 'FileText', icon: <FileText size={20} /> },
  { name: 'Database', icon: <Database size={20} /> },
  { name: 'Target', icon: <Target size={20} /> },
];

export const CreateSpace = ({
  createSpaceOpen,
  setCreateSpaceOpen,
  spaceName,
  setSpaceName,
  description,
  setDescription,
  selectedIcon,
  setSelectedIcon,
  privateAccess,
  setPrivateAccess,
  initials,
  onCreateSpace,
}: Props) => {
  const resetForm = () => {
    setSpaceName('');
    setDescription('');
    setSelectedIcon(null);
    setPrivateAccess(false);
    setCreateSpaceOpen(false);
  };

  const isSubmitDisabled = !spaceName.trim();

  // Helper function to generate a color based on initials for consistent coloring
  const getInitialsColor = (text: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500',
    ];

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const onSelectIcon = (
    e: React.MouseEvent,
    icon: { icon: React.ReactNode }
  ) => {
    e.preventDefault();
    setSelectedIcon(icon.icon);
  };

  return (
    <Dialog
      open={createSpaceOpen}
      onOpenChange={(open) => {
        if (!open) resetForm();
        setCreateSpaceOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create a Space
          </DialogTitle>
          <DialogDescription>
            A space represents teams, departments or groups, each with its own
            Lists, workflows, and settings.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Space Name with Icon Integration */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg items-center border-dashed border-gray-300  bg-primary-foreground"
                >
                  {selectedIcon ? (
                    <div className="text-muted-foreground">{selectedIcon}</div>
                  ) : (
                    <div
                      className={`h-[inherit] w-[inherit] rounded-lg ${getInitialsColor(initials)} flex items-center justify-center text-white font-medium`}
                    >
                      {initials || 'S'}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 ">
                <DropdownMenuLabel>Choose an icon</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-6 gap-1 p-2 max-h-40 overflow-y-auto">
                  {iconOptions.map((icon, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-gray-100 rounded p-0"
                      onSelect={(e) => onSelectIcon(e, icon)}
                    >
                      {icon.icon}
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                {selectedIcon && (
                  <DropdownMenuItem
                    className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded text-red-500"
                    onClick={() => setSelectedIcon(null)}
                  >
                    <Ban size={16} /> Clear icon
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              id="spaceName"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              placeholder="My New Space"
              autoFocus
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm text-muted-foreground font-semibold"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this space will be used for..."
              rows={3}
              className="w-full resize-none"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <Label
                htmlFor="spaceAccess"
                className="text-sm text-muted-foreground font-semibold"
              >
                Make Private
              </Label>
              <DialogDescription>
                Only you and invited members have access
              </DialogDescription>
            </div>
            <Switch
              id="spaceAccess"
              checked={privateAccess}
              onCheckedChange={setPrivateAccess}
            />
          </div>

          <DialogFooter className="flex flex-row mt-2">
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateSpaceOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                className="bg-indigo-600 border border-accent hover:bg-indigo-700 text-white"
                onClick={onCreateSpace}
                disabled={isSubmitDisabled}
              >
                Create Space
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
