import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IState } from "src/app/interfaces/state";



export const projectSelector = createSelector(
    createFeatureSelector('projectReducer'),
    (state: IState) => state.lastViewedProject
);
