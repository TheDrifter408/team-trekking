import { Space } from "@/types/Space";
import { Text } from "@nabhan/view-module";
import { Ellipsis, Grid2x2 } from "lucide-react";
import { FC, useRef, useState } from "react";
import { Link } from "react-router";
import OptionsMenu from "./OptionsMenu";
import { Folder } from "@/types/Folder";
import { List } from "@/types/List";
import FolderItem from "./FolderItem";
import ListItem from "./ListItem";
import { motion } from "framer-motion";

interface SpaceItemProps {
    space: Space,
    workspaceId:string
}
const SpaceItem:FC<SpaceItemProps> = ({ space, workspaceId }) => {
    
    const [optionsOpen, setOptionsOpen] = useState(false);
    
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <li key={workspaceId} className="space-x-2 px-2 rounded-lg ml-3">
            <div className="flex items-center justify-between">
                <Link to={`/workspace/${workspaceId}`} className="flex items-center space-x-2 hover:bg-bg-secondary p-2 rounded-lg">
                    <Grid2x2 className="w-5 h-5" />
                    <Text variant="body-small" weight="normal" className="dark:text-white text-nowrap">
                        {space.name}
                    </Text>
                </Link>
                <div className="relative">
                    <button 
                    ref={buttonRef} 
                    onClick={() => setOptionsOpen((prev) => !prev)}
                    className="hover:bg-bg-secondary px-2 py-1 rounded-lg">
                        <Ellipsis className="w-5 h-5" />
                    </button>
                    <OptionsMenu isOpen={optionsOpen} setIsOpen={setOptionsOpen} buttonRef={buttonRef} />
                </div>
            </div>
            <motion.ul className="">
                { 
                space.folders.map((folder:Folder) => (
                    <FolderItem key={folder.id} folder={folder} />
                ))
                }
            </motion.ul>
            <motion.ul className="">
                {
                space.lists.map((list: List) => (
                    <ListItem key={list.id} list={list} />
                ))
                }
            </motion.ul>
        </li>
    )
}

export default SpaceItem;