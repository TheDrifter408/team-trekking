import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface SettingsCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  onClickSettings?: () => void;
}
export const SettingsCard = ({
  icon,
  title,
  children,
  onClickSettings,
}: SettingsCardProps) => {
  return (
    <div
      className="mt-2 cursor-pointer border items-center rounded-xl p-[12px] flex justify-between"
      onClick={onClickSettings}
    >
      <div className="flex overflow-hidden">
        <div className="size-[42px] items-center justify-center bg-accent/40 border rounded-xl flex flex-shrink-0">
          {icon}
        </div>
        <div className="ml-2 w-4/5 overflow-hidden">
          <p className="text-base font-medium">{title}</p>
          {children}
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center ml-2">
        <span className="text-xs font-medium text-muted-foreground bg-accent rounded-full size-[16px] flex items-center justify-center">
          ?
        </span>
        <ChevronRight className="h-4 w-4 font-medium text-muted-foreground" />
      </div>
    </div>
  );
};
