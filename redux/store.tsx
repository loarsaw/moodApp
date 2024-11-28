import { configureStore } from '@reduxjs/toolkit';
import asyncReducer from './asyncSlice/slice';
import questionsReducer from './questionSlice/slice';
import historyReducer from './historySlice/slice';

export const store = configureStore({
    reducer: {
        async: asyncReducer,
        questions: questionsReducer,
        history: historyReducer
    },
});
// For AutoComplete
export type RootState = ReturnType<typeof store.getState>