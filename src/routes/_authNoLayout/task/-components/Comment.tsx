import { AssigneeAvatar } from "@/components/common/assignee-avatar";
import { Button } from "@/components/shadcn-ui/button";
import { Ellipsis, FileUser, Flower, Pencil, Reply, SmilePlus, ThumbsUp } from "lucide-react";
import { FC, useState } from "react";
import { DocEditor } from "@/pages/task/components/doc-editor";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn-ui/tooltip";
import { CommentProps } from "@/types/interfaces/activitySearch";

export const Comment: FC<CommentProps> = ({ comment }) => {

    const [isEditing, setIsEditing] = useState(false);

    const onClickEdit = () => {
        setIsEditing((prev) => !prev);
    }

    return (
        <div className="group/comment grid gap-2 border rounded-xl w-full text-base">
            <div className="flex items-center rounded-xl justify-between p-5">
                <AssigneeAvatar
                    assignee={comment.assignee}
                    displayName={true}
                    onRemove={() => { }}
                    showButtons={false}
                    className='pointer-events-none w-min'
                />
                <div className="relative">
                    {/* Menu onHover */}
                    <div className='absolute bg-white top-0 right-0 rounded-xl invisible group-hover/comment:visible'>
                        <div className="flex items-center">
                            <Button variant={'ghost'} size={'icon_sm'}>
                                <Flower />
                            </Button>
                            <Button variant={'ghost'} size={'icon_sm'} onClick={onClickEdit}>
                                <Pencil />
                            </Button>
                            <Button variant={'ghost'} size={'icon_sm'}>
                                <FileUser />
                            </Button>
                            <Button variant={'ghost'} size={'icon_sm'}>
                                <Reply />
                            </Button>
                            <Button variant={'ghost'} size={'icon_sm'}>
                                <Ellipsis />
                            </Button>
                        </div>
                    </div>
                    <span className="text-muted-foreground text-nowrap text-sm">{comment.date}</span>
                </div>
            </div>
            {/* Comment Content */}
            <div className="text-xl text-black rounded-xl px-5">
                <DocEditor
                    editable={isEditing}
                    showBorder={false}
                    name="comment"
                    value={comment.content}
                    onChange={() => { }}
                    showToolbar={true}
                    setIsEditing={onClickEdit} />
            </div>
            {/* Comment Footer */}
            <div className="flex items-center justify-between hover:bg-slate-50 border-t rounded-b-xl py-2 px-5">
                {/* Button Icons Like, React */}
                <div className="flex flex-nowrap gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                size={'icon_sm'}
                                variant={'ghost'}
                                className="hover:bg-slate-200 rounded-full">
                                <ThumbsUp />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Like this comment
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                size={'icon_sm'}
                                variant={'ghost'}
                                className="hover:bg-slate-200 rounded-full">
                                <SmilePlus />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            React to this comment
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div>
                    {/* If this comment has replies */}
                    {
                        comment.reply ? (
                            <Button size='sm' className="flex gap-2 hover:bg-slate-200 text-muted-foreground py-1 px-2 text-xs font-medium" variant={'ghost'}>
                                {comment.reply.count} Reply
                                <AssigneeAvatar assignee={comment.reply.author} displayName={false} onRemove={() => { }} />
                            </Button>
                        ) : (
                            <Button variant="ghost" className="text-muted-foreground py-1 px-2 text-xs font-medium hover:bg-slate-200">
                                Reply
                            </Button>
                        )
                    }

                </div>
            </div>
        </div>
    )
}