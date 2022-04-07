import { createReducer, on } from "@ngrx/store";
import { populateDropdowns } from "../actions/dropdowns";
import { globalState } from "../app.state";


export const dropdownsReducer = createReducer(
    globalState,
    on(populateDropdowns, (state, dropdowns) => ({
        ...state,
        dropdowns: dropdowns
    }))
);

