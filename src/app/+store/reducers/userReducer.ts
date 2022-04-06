import { createReducer, on } from "@ngrx/store";
import { populateUser } from "../actions/user";
import { globalState } from "../app.state";


export const userReducer = createReducer(
    globalState,
    on(populateUser, (state, { user }) => ({
        ...state,
        user: user
    }))
);

