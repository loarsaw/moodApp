import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: [
            {
                question: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Madrid'],
                correctAnswer: 'Paris',
            },
            {
                question: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
                correctAnswer: 'Mars',
            },
            {
                question: 'What is the largest ocean on Earth?',
                options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
                correctAnswer: 'Pacific',
            },
        ]
    },
    reducers: {


    },
});

// export const { on, off } = questionSlice.actions;


export default questionSlice.reducer;