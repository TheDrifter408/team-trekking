import { Folder } from "./Folder";
import { List } from "./List";

export type Space = {
    id:string;
    name:string;
    description:string;
    folders: Folder[];
    lists: List[],
}