import { IProject } from "./project";
import { ITask } from "./task";

export interface IUser {
    email: string;
    fullName: string;
    iat: number;
    password: string; 
    username: string;
    projects: IProject[];
    tasks: ITask[];
    __v: number;
    _id: string;
}


