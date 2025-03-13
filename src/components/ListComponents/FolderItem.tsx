import { Folder } from "@/types/Folder"
import { Text } from "@nabhan/view-module";
import { Ellipsis, Folder as LucideFolder } from "lucide-react";
import { FC, useRef, useState } from "react"
import OptionsMenu from "./OptionsMenu";

interface FolderItemProps {
    folder:Folder
}
const FolderItem:FC<FolderItemProps> = ({folder}) => {

    const [optionsOpen, setOptionsOpen] = useState(false);
    
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <li key={folder.id} className={`flex items-center space-x-2 px-2 rounded-lg`}>
            <div className="flex items-center justify-between">
                <Text variant="body-small" weight="normal" className="dark:text-white text-nowrap flex items-center gap-1">
                    <LucideFolder className="w-5 h-5" />
                    {folder.name}
                </Text>
            </div>
            <div className="relative">
                <button ref={buttonRef} onClick={() => setOptionsOpen((prev) => !prev)} className="hover:bg-bg-secondary px-2 py-1 rounded-lg">
                    <Ellipsis className="w-5 h-5" />
                </button>
                <OptionsMenu isOpen={optionsOpen} setIsOpen={setOptionsOpen} buttonRef={buttonRef} />
            </div>
        </li>
    )
}

export default FolderItem;