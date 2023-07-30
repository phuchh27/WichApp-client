import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    auth : fromAuth.State;
}