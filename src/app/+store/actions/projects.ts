import { createAction, props } from "@ngrx/store";

export const setLastViewedProject = createAction('setLastViewedProject', props<any>());


export const changeTaskStatus = createAction("changeTaskStatus", props<{ status: string, id: string}>());

export const editTaskProps = createAction("editTaskProps", props<any>());

export const deleteTask = createAction("deleteTask", props<{ id: string }>());

export const addIssueToSelectedProject = createAction("addIssue", props<any>());


export const addParticipant = createAction("addParticipant", props<any>());