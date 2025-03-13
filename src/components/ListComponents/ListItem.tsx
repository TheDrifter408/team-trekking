import { List } from "@/types/List";
import { Text } from "@nabhan/view-module";
import { Ellipsis, List as LucideList } from "lucide-react";
import { FC, useRef, useState } from "react";
import OptionsMenu from "./OptionsMenu";

interface ListItemProps {
    list: List
}
const ListItem:FC<ListItemProps> = ({ list }) => {

    const [optionsOpen, setOptionsOpen] = useState(false);
    
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    return (
        <li key={list.id} className={`flex items-center justify-between p-2 rounded-lg`}>
            <Text variant="body-small" weight="normal" className="dark:text-white flex items-center text-nowrap">
                <LucideList className="h-5 w-5" />
                {list.name}
            </Text>
            <div className="relative">
                <button ref={buttonRef} onClick={() => setOptionsOpen((prev) => !prev)} className="hover:bg-bg-secondary px-2 py-1 rounded-lg">
                    <Ellipsis className="W-5 h-5" />
                </button>
                <OptionsMenu isOpen={optionsOpen} setIsOpen={setOptionsOpen} buttonRef={buttonRef} />
            </div>
        </li>
    )
}

export default ListItem;