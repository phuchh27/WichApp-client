import { createReducer, on } from "@ngrx/store";
import { Store } from "src/app/models/store.model";
import { registerStaff } from "./staff.actions";


export interface State{
    Store : Store[];
    loading:boolean;
    error: string | null;   
}
const initialState: State = {
    Store : [],
    loading: false,
    error:null
}

export const staffReducer = createReducer(
    initialState,
    on(registerStaff, (state, { staff }) => {
      console.log('Registration request sent:', staff);
      return state; 
    })
);