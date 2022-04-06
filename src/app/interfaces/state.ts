import { IUser } from "./user";

// global state interface
export interface IState {
    user: IUser
    priorities: [],
    statuses: [],
    issueTypes: []
}