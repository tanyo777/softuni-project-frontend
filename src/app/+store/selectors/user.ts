import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IState } from "src/app/interfaces/state";



export const userSelector = createSelector(
    createFeatureSelector('userReducer'),
    (state: IState) => state.user
);

