import { IProject } from "./project";

export interface ITask {
    _id: string;
    issueType: string;
    summary: string;
    // creator: IUser,
    assignedTo: string,
    description: string;
    project: IProject
    priority: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}