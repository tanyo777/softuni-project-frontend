import { IUser } from "./user";

export interface IProject {
    name: string;
    key: string;
    projectType: string;
    projectCategory: string;
    description: string;
    participants: IUser[]
}
