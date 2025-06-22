import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/button';
import {
  StarIcon,
  EyeOff,
  Copy,
  Trash2,
  Archive,
  Plus,
  Palette,
  Settings,
  WandSparkles,
  PencilIcon,
} from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings';

export const BreadcrumbMenuDropdown = ({
  children,
  onAction,
}: {
  children: React.ReactNode;
  onAction: (action: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="!w-[272px] px-[6px] py-1"
      >
        <DropdownMenuItem onSelect={() => onAction('rename')}>
          <PencilIcon className="mr-2 size-4 text-content-tertiary" />
          {LABEL.RENAME}
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => onAction('copy-link')}>
          <Copy className="mr-2 size-4 text-content-tertiary" />
          {LABEL.COPY_LINK}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus className="mr-2 size-4 text-content-tertiary" />
            {LABEL.CREATE_NEW}
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 size-4 text-content-tertiary" />
            {LABEL.COLOR_ICON}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={() => onAction('change-color')}>
              {LABEL.CHANGE_COLOR}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onAction('change-icon')}>
              {LABEL.CHANGE_ICON}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem onSelect={() => onAction('space-settings')}>
          <Settings className="mr-2 size-4 text-content-tertiary" />
          {LABEL.SPACE_SETTINGS}
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <WandSparkles className="mr-2 size-4 text-content-tertiary" />
            {LABEL.TEMPLATES}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={() => onAction('browse-templates')}>
              {LABEL.BROWSE_TEMPLATES}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onAction('save-template')}>
              {LABEL.SAVE_AS_TEMPLATE}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => onAction('add-to-favorites')}>
          <StarIcon className="mr-2 size-4 text-content-tertiary" />
          {LABEL.ADD_TO_FAVORITES}
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => onAction('hide-space')}>
          <EyeOff className="mr-2 size-4 text-content-tertiary" />
          {LABEL.HIDE_SPACE}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => onAction('duplicate')}>
          <Copy className="mr-2 size-4 text-content-tertiary" />
          {LABEL.DUPLICATE}
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => onAction('archive')}>
          <Archive className="mr-2 size-4 text-content-tertiary" />
          {LABEL.ARCHIVE}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => onAction('delete')}
          className="text-destructive"
        >
          <Trash2 className="mr-2 size-4 text-destructive" />
          {LABEL.DELETE}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <Button
          variant="default"
          className="w-full mt-2 bg-theme-main text-white"
          onClick={() => onAction('sharing-permissions')}
        >
          {LABEL.SHARING_AND_PERMISSIONS}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
