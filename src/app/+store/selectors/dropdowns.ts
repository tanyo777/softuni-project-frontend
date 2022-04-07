import { createSelector, createFeatureSelector } from "@ngrx/store";



export const dropdownsSelector = createSelector(
    createFeatureSelector('dropdownsReducer'),
    (state: any) => state.dropdowns
);

