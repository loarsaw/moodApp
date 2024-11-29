import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type USER = {
    user: {
        email: {} | null
    },
};

const initialState: USER = {
    user: {
        email: null
    },
};

export const userSlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<USER>) => {
            state.user = action.payload.user;
        },

    },
});

export const { addUser } = userSlice.actions;


export default userSlice.reducer;