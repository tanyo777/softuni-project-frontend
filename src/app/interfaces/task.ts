import { IProject } from "./project";
import { IUser } from "./user";

export interface ITask {
    issueType: string;
    summary: string;
    creator: IUser,
    assignedTo: IUser,
    description: string;
    project: IProject
    priority: string;
    createdAt: string;
}