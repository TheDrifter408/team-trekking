import { Space, Task } from "@/types/ApiResponse";

// Format timestamp to display relative time
export const formatTimeAgo = (date:Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // Difference in minutes

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
};

export const ExtractTasks = (space: Space) => {
    let allTasks: Task[] = [];
    space.folders.forEach((folder) => {
        folder.lists.forEach((list) => {
        allTasks = allTasks.concat(list.tasks);
        });
    });
    return allTasks;
};