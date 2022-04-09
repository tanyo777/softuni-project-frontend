import { createReducer, on } from "@ngrx/store";
import { leaveProject, populateUser } from "../actions/user";
import { globalState } from "../app.state";


export const userReducer = createReducer(
    globalState,
    on(populateUser, (state, { user }) => ({
        ...state,
        user: user
    })),
    on(leaveProject, (state: any, { id }) => ({
        ...state,
        user: {
            ...state.user,
            projects: state.user.projects.filter((project: any) => project._id !== id)
        }
    }))
);



