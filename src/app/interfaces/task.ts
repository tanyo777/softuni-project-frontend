import { IProject } from "./project";
import { IUser } from "./user";

export interface ITask {
    _id: string;
    issueType: string;
    summary: string;
    // creator: IUser,
    assignedTo: IUser,
    description: string;
    project: IProject
    priority: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}