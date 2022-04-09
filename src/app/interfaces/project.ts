import { IUser } from "./user";

export interface IProject {
    _id: string;
    name: string;
    key: string;
    projectType: string;
    projectCategory: string;
    description: string;
    participants: IUser[],
}
