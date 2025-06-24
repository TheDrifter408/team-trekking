import { Assignee } from "@/types/props/Common";
import { AssigneeAvatar } from "@/components/common/assignee-avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../shadcn-ui/tooltip";

interface UsersArray {
    visibleUsers: Assignee[];
    extraUsers: Assignee[];
    onRemove: (user: Assignee) => void;
    isMouseEnter?: boolean
}
export const UsersArray = ({ visibleUsers, extraUsers, onRemove, isMouseEnter }: UsersArray) => {
    const totalUsers = visibleUsers.length + extraUsers.length;
    return (
        <div className="flex">
            <div className="w-full *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                {visibleUsers.map((user, idx) => (
                    <AssigneeAvatar
                        key={idx}
                        assignee={user}
                        displayName={false}
                        isSelected={true}
                        enterAssignee={isMouseEnter}
                        onRemove={() => onRemove(user)}
                        className="border p-1 bg-white rounded-full"
                    />
                ))}
            </div>
            {
                extraUsers.length > 0 && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="w-8 h-8 p-1 rounded-full bg-muted text-xs flex items-center justify-center text-muted-foreground ml-[-10px]"
                                    style={{ zIndex: totalUsers - 3 }}
                                >
                                    +{extraUsers.length}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="p-1 space-y-1">
                                    {extraUsers.map((user) => (
                                        <div key={user.id} className="whitespace-nowrap text-sm">
                                            {user.name}
                                        </div>
                                    ))}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            }
        </div>
    )
}