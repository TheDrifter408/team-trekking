import { Folder } from "./Folder";

export type Space = {
    id:string;
    name:string;
    description:string;
    folders: Folder[];
}