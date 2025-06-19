import { Assignee } from "../props/Common";

export interface Comment {
    assignee: Assignee,
    date: Date,
    id: number,
    content: string,
    reply?: {
        count: number,
        author: Assignee
    }
}