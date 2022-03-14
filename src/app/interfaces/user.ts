export interface IUser {
    email: string;
    fullName: string;
    password: string; 
    username: string;
    projects: IProjects;
    tasks: ITasks;
    __v: number;
    _id: string;
}



export interface IProjects {
    projects: string[];
}

export interface ITasks {
    tasks: string[];
}