import { ClickApp } from "@/types/request-response/space/ApiResponse"
import { Dialog, DialogContent, DialogHeader } from "../shadcn-ui/dialog";
import { Switch } from "../shadcn-ui/switch";
import { cn } from "@/lib/utils/utils";
import { AppWindow, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn-ui/tooltip";
import { Separator } from "../shadcn-ui/separator";

interface ClickAppsDialogProps {
    selectedClickApps: ClickApp[],
    onSelectClickApp: (app: ClickApp) => void;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ClickAppsDialog = ({ selectedClickApps, onSelectClickApp, isOpen, onOpenChange }: ClickAppsDialogProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={() => onOpenChange(!isOpen)}>
            <DialogContent className={
                cn('transition-opacity duration-300',
                    "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
                )
            }>
                <DialogHeader className="mx-auto text-2xl">
                    Enable ClickApps
                </DialogHeader>
                <Separator />
                <div className="">
                    <div className="flex items-center gap-1 w-min mx-auto">
                        <Switch /> <span className="text-nowrap">{'Turn off all ClickApps'}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    {
                        selectedClickApps.map((app: ClickApp) => (
                            <div
                                onClick={() => onSelectClickApp(app)}
                                className={cn('p-2 rounded-sm flex items-center gap-1 border hover:cursor-pointer', 
                                    app.isActive ? 'border-slate-500' : 'border-slate-300 text-slate-300')}
                            >
                                {app.iconUrl.length > 0 ? <img src={app.iconUrl} alt={`${app.tooltip}`} /> : <AppWindow />}
                                <div className="flex-1">
                                    <p>{app.title}</p>
                                </div>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {app.tooltip ? app.tooltip : 'Tooltop Content'}
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}