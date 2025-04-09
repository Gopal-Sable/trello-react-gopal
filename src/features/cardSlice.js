import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // Sets cards 
    setCards: (state, action) => {
      const { id, data } = action.payload;
      state[id] = data;
    },

    // Adds a new card
    addCard: (state, action) => {
      const { id, data } = action.payload;
      if (!state[id]) state[id] = [];
      state[id].push(data);
    },

    // Removes a card by ID 
    removeCard: (state, action) => {
      const { id, cardId } = action.payload;
      if (state[id]) {
        state[id] = state[id].filter(card => card.id !== cardId);
      }
    },

    // Toggles the status
    toggleCard: (state, action) => {
      const { id, data: cardId } = action.payload;
      const card = state[id]?.find(card => card.id === cardId);
      if (card) {
        card.dueComplete = !card.dueComplete;
      }
    },
  },
});

export const { setCards, addCard, removeCard, toggleCard } = cardSlice.actions;
export default cardSlice.reducer;
