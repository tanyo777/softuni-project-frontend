import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/interfaces/user";


export const populateUser = createAction('populateUser', props<{ user: IUser}>())