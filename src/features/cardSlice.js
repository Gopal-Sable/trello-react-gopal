import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: "cards",
    initialState: {},
    reducers: {
        setCards: (state, action) => {
            state[action.payload.id] = action.payload.data;
        },
        addCard: (state, action) => {
            state[action.payload.id].push(action.payload.data);
        },
        removeCard: (state, action) => {
            state[action.payload.id] = state[action.payload.id].filter(
                (card) => card.id !== action.payload.cardId
            );
        },
        toggleCard: (state, action) => {
            const card = state[action.payload.id].find(
                (card) => card.id === action.payload.data
            );
            if (card) card.dueComplete = !card.dueComplete;
        },
    },
});

export const { setCards, addCard, removeCard, toggleCard } = cardSlice.actions;
export default cardSlice.reducer;
