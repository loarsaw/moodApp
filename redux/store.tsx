import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './chatSlice/slice';
import asyncReducer from './asyncSlice/slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        async: asyncReducer
    },
});
// For AutoComplete
export type RootState = ReturnType<typeof store.getState>