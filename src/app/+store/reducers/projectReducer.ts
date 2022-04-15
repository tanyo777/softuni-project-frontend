import { createReducer, on } from "@ngrx/store";
import { addIssueToSelectedProject, addParticipant, changeTaskStatus, deleteTask, editTaskProps, setLastViewedProject } from "../actions/projects";
import { globalState } from "../app.state";

export const projectReducer = createReducer(
    globalState,
    on(setLastViewedProject, (state, project) =>({
        ...state,
        lastViewedProject: project
    })),
    on(changeTaskStatus, (state: any, { status, id }) => ({
        ...state,
        lastViewedProject: {
            ...state.lastViewedProject,
           tasks: state.lastViewedProject.tasks.map((obj: any) => {
               if(obj._id === id) {
                   obj = {
                       ...obj,
                       status
                   }
                   
               }
               return obj;
           })
        }
    })),
    on(deleteTask, (state: any, { id }) => ({
        ...state,
        lastViewedProject: {
            ...state.lastViewedProject,
            tasks: state.lastViewedProject.tasks.filter((task: any) => task._id !== id)
        }
    })),
    on(addIssueToSelectedProject, (state: any, issue) => ({
        ...state,
        lastViewedProject: {
            ...state.lastViewedProject,
            tasks: [...state.lastViewedProject.tasks, issue]
        }
    })),
    on(addParticipant, (state: any, participant) => ({
        ...state,
        lastViewedProject: {
            ...state.lastViewedProject,
            participants: [...state.lastViewedProject.participants, participant]
        }
    })),
    // :TODO
    on(editTaskProps, (state: any, { id, summary, issueType, priority, description, createdAt, updatedAt, assignedTo}) => ({
        ...state,
        lastViewedProject: {
            ...state.lastViewedProject,
           tasks: state.lastViewedProject.tasks.map((obj: any) => {
               if(obj._id === id) {
                   console.log(obj);
                   obj = {
                       ...obj,
                       id,
                       summary,
                       issueType,
                       priority,
                       description,
                       assignedTo
                   }
                   
               }
               return obj;
           })
        }
    })),

    
)