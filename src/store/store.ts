import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../components/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    //middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;