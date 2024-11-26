import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './chatSlice/slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});