import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import { getInitials } from '@/lib/utils.ts';

interface Props {
  isActive: boolean;
  onClose: () => void;
}

// Available icons with their names
const iconOptions = [
  { name: 'Briefcase', icon: <Briefcase size={14} /> },
  { name: 'Users', icon: <Users size={14} /> },
  { name: 'Globe', icon: <Globe size={14} /> },
  { name: 'Star', icon: <Star size={14} /> },
  { name: 'Home', icon: <Home size={14} /> },
  { name: 'Book', icon: <Book size={14} /> },
  { name: 'Rocket', icon: <Rocket size={14} /> },
  { name: 'Heart', icon: <Heart size={14} /> },
  { name: 'Calendar', icon: <Calendar size={14} /> },
  { name: 'Settings', icon: <Settings size={14} /> },
  { name: 'Map', icon: <Map size={14} /> },
  { name: 'Mail', icon: <Mail size={14} /> },
  { name: 'Zap', icon: <Zap size={14} /> },
  { name: 'Coffee', icon: <Coffee size={14} /> },
  { name: 'Cloud', icon: <Cloud size={14} /> },
  { name: 'Music', icon: <Music size={14} /> },
  { name: 'Camera', icon: <Camera size={14} /> },
  { name: 'Palette', icon: <Palette size={14} /> },
  { name: 'Gift', icon: <Gift size={14} /> },
  { name: 'Trophy', icon: <Trophy size={14} /> },
  { name: 'Lightbulb', icon: <Lightbulb size={14} /> },
  { name: 'Bell', icon: <Bell size={14} /> },
  { name: 'Layers', icon: <Layers size={14} /> },
  { name: 'FileText', icon: <FileText size={14} /> },
  { name: 'Database', icon: <Database size={14} /> },
  { name: 'Target', icon: <Target size={14} /> },
];

// Available color options with Tailwind classes
const colorOptions = [
  { name: 'Blue', bgClass: 'bg-blue-500', textClass: 'text-white' },
  { name: 'Green', bgClass: 'bg-green-500', textClass: 'text-white' },
  { name: 'Yellow', bgClass: 'bg-yellow-500', textClass: 'text-black' },
  { name: 'Purple', bgClass: 'bg-purple-500', textClass: 'text-white' },
  { name: 'Pink', bgClass: 'bg-pink-500', textClass: 'text-white' },
  { name: 'Indigo', bgClass: 'bg-indigo-500', textClass: 'text-white' },
  { name: 'Red', bgClass: 'bg-red-500', textClass: 'text-white' },
  { name: 'Teal', bgClass: 'bg-teal-500', textClass: 'text-white' },
  { name: 'Gray', bgClass: 'bg-gray-500', textClass: 'text-white' },
  { name: 'Orange', bgClass: 'bg-orange-500', textClass: 'text-white' },
];

export const UpdateSpace = ({ isActive, onClose }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [spaceName, setSpaceName] = useState('ProjecX Moon');

  const initials = getInitials(spaceName)[0];

  const onSelectIcon = (
    e: React.MouseEvent,
    icon: { icon: React.ReactNode }
  ) => {
    e.preventDefault();
    setSelectedIcon(icon.icon);
  };

  const onSelectColor = (color: (typeof colorOptions)[0]) => {
    setSelectedColor(color);
  };

  const clearIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIcon(null);
  };

  return (
    <Dialog open={isActive} onOpenChange={onClose}>
      {/* Add styles to ensure the page is scrollable when dialog is open */}
      <style jsx global>{`
        body.has-dialog {
          overflow: auto !important;
          padding-right: 0 !important;
        }

        [data-radix-popper-content-wrapper] {
          z-index: 9999 !important;
        }
      `}</style>

      <DialogContent
        className="!max-w-[690px] !max-h-[90vh] overflow-y-auto"
        // The key is adding max-height and overflow-y-auto to the DialogContent
        onOpenAutoFocus={(e) => {
          // Add class to body when dialog opens
          document.body.classList.add('has-dialog');
          // Clean up when dialog closes
          return () => {
            document.body.classList.remove('has-dialog');
          };
        }}
      >
        {/* Header Text */}
        <div>
          <p className="text-xl text-primary font-semibold">
            Edit Space settings
          </p>
          <p className="text-base text-muted-foreground mt-1 w-full md:w-[90%]">
            A Space represents teams, departments, or groups, each with its own
            Lists, workflows, and settings.
          </p>
        </div>

        {/*  Icon & Name section */}
        <div>
          <p className="text-base font-medium text-muted-foreground">
            Icon & name
          </p>
          <div className="mt-2 relative flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className={`rounded-lg items-center text-center flex ${selectedColor.bgClass}  border-0`}
                >
                  {selectedIcon ? (
                    <div className={`text-${selectedColor.textClass}`}>
                      {selectedIcon}
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center ${selectedColor.textClass} font-medium`}
                    >
                      {initials}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side={'bottom'}
                className="w-[300px] absolute px-2"
              >
                <p className={'text-xs mt-1  text-muted-foreground'}>
                  Space color
                </p>
                <div className="flex flex-wrap mt-2 gap-2">
                  {colorOptions.map((color, i) => (
                    <div
                      key={i}
                      className={`h-6 w-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center 
                        ${color.bgClass} 
                        ${selectedColor.name === color.name ? 'ring-2 ring-offset-2' : ''}`}
                      onClick={() => onSelectColor(color)}
                      title={color.name}
                    />
                  ))}
                </div>

                <DropdownMenuLabel>Choose an icon</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-6 gap-1 p-2 max-h-[200px] overflow-y-auto">
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
                <DropdownMenuLabel>Choose a color</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                {selectedIcon && (
                  <DropdownMenuItem
                    className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded text-red-500"
                    onSelect={clearIcon}
                  >
                    <Ban size={16} /> Clear icon
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
            />
          </div>
        </div>

        {/* Additional content to demonstrate scrolling if needed */}
      </DialogContent>
    </Dialog>
  );
};
