import { LABEL } from '@/lib/constants/appStrings.ts';
import { Main } from '@/components/layout/main';
import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Label } from '@/components/shadcn-ui/label.tsx';
import { Icon } from '@/assets/icon-path';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover.tsx';

const SettingsPage = () => {
  const [workspaceName, setWorkspaceName] = useState(
    "Jawahiir Nabhan's Workspace"
  );
  const [whiteLabel, setWhiteLabel] = useState(false);
  const [personalLayout, setPersonalLayout] = useState(true);
  const [isSaved, setIsSaved] = useState(true);
  const [selectedColor, setSelectedColor] = useState('bg-emerald-500');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  // Available workspace colors
  const workspaceColors = [
    { name: 'Purple', class: 'bg-purple-500', hex: '#8B5CF6' },
    { name: 'Blue', class: 'bg-blue-500', hex: '#3B82F6' },
    { name: 'Sky', class: 'bg-sky-500', hex: '#0EA5E9' },
    { name: 'Emerald', class: 'bg-emerald-500', hex: '#10B981' },
    { name: 'Teal', class: 'bg-teal-500', hex: '#14B8A6' },
    { name: 'Yellow', class: 'bg-yellow-500', hex: '#EAB308' },
    { name: 'Orange', class: 'bg-orange-500', hex: '#F97316' },
    { name: 'Red', class: 'bg-red-500', hex: '#EF4444' },
    { name: 'Pink', class: 'bg-pink-500', hex: '#EC4899' },
    { name: 'Violet', class: 'bg-violet-500', hex: '#8B5CF6' },
    { name: 'Stone', class: 'bg-stone-500', hex: '#78716C' },
    { name: 'Black', class: 'bg-black', hex: '#000000' },
  ];

  const onColorSelect = (colorClass: string) => {
    setSelectedColor(colorClass);
    setIsSaved(false);
    setIsColorPickerOpen(false);
  };

  const onSave = () => {
    // on save logic here
    setIsSaved(true);
  };

  const onDelete = () => {};

  const onInputChange = (value: string) => {
    setWorkspaceName(value);
    setIsSaved(false);
  };

  const onToggleChange = (
    checked: boolean,
    type: 'whiteLabel' | 'personalLayout'
  ) => {
    if (type === 'whiteLabel') {
      setWhiteLabel(checked);
    } else {
      setPersonalLayout(checked);
    }
    setIsSaved(false);
  };

  return (
    <Main>
      <div className={'mx-[48px] my-[8px]'}>
        <p className={'text-3xl font-semibold mb-8'}>
          {LABEL.WORKSPACE_SETTINGS}
        </p>

        {/* Workspace Name Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Popover
              open={isColorPickerOpen}
              onOpenChange={setIsColorPickerOpen}
            >
              <PopoverTrigger asChild>
                <button
                  className={`size-12 ${selectedColor} text-white rounded-xl font-medium flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  <span style={{ fontSize: '20px' }}>{workspaceName[0]}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    {LABEL.WORKSPACE_COLOR}
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {workspaceColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => onColorSelect(color.class)}
                        className={`size-4 ${color.class} rounded-full hover:scale-110 transition-transform ${
                          selectedColor === color.class
                            ? 'ring-2 ring-gray-400 ring-offset-2'
                            : ''
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>

                  {/* Add Custom Avatar Button */}
                  <button
                    className="w-full mt-4 p-1 border-2 border-pink-300 rounded-lg text-pink-500 hover:bg-pink-50 transition-colors"
                    onClick={() => {}}
                  >
                    {LABEL.ADD_CUSTOM_COLOR}
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex-1">
              <Label className="text-sm font-medium text-content-default mb-2 block">
                {LABEL.WORKSPACE_NAME}
              </Label>
              <Input
                value={workspaceName}
                onChange={(e) => onInputChange(e.target.value)}
                className="!text-base text-gray-600 border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 focus:border-gray-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 bg-transparent"
                placeholder="Enter workspace name"
              />
            </div>
          </div>
        </div>

        {/* White Label Section */}
        <div className="border border-border/70 rounded-sm px-[24px] h-[88px] flex items-center space-x-5">
          <Switch
            checked={whiteLabel}
            onCheckedChange={(checked) => onToggleChange(checked, 'whiteLabel')}
            className="mt-1"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-content-default mb-1">
              {LABEL.WHITE_LABEL}
            </h3>
            <p className="text-sm text-content-tertiary">
              {LABEL.SKIN_TEAM_TREKKING}
            </p>
          </div>
        </div>

        {/* Personal Workspace Layout Section */}
        <div className=" my-[24px] pb-[22px]">
          <div className="h-[64px] flex items-center space-x-4">
            <Switch
              checked={personalLayout}
              onCheckedChange={(checked) =>
                onToggleChange(checked, 'personalLayout')
              }
              className="mt-1 data-[state=checked]:bg-pink-500"
            />
            <div className="flex items-start space-x-3 flex-1">
              <Icon
                name={'user'}
                className={'text-theme-main size-[48px] fill-current'}
              />
              <div>
                <h3 className="text-lg font-medium text-content-default mb-1">
                  {LABEL.PERSONAL_WORKSPACE_LAYOUT}
                </h3>
                <p className="text-sm text-content-tertiary">
                  {LABEL.TIME_TO_COLLABORATE}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-6">
          <Button
            variant="ghost"
            onClick={onDelete}
            size={'auto'}
            className="text-lg hover:bg-transparent hover:text-theme-content-primary !px-0 font-normal text-theme-main"
          >
            {LABEL.DELETE_WORKSPACE}
          </Button>

          <Button
            onClick={onSave}
            disabled={isSaved}
            className={`px-6 h-[62px] w-[138px] text-lg rounded-lg font-medium ${
              isSaved
                ? 'bg-pink-400 text-white cursor-default'
                : 'bg-pink-500 hover:bg-pink-600 text-white'
            }`}
          >
            {isSaved ? LABEL.SAVED : LABEL.SAVE}
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default SettingsPage;
