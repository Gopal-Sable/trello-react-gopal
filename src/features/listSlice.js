import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    // Set all lists to a board
    setLists: (state, action) => {
      const { id, data } = action.payload;
      state[id] = data;
    },

    // Add a list 
    addList: (state, action) => {
      const { id, data } = action.payload;
      if (!state[id]) state[id] = [];
      state[id].push(data);
    },

    // Remove a list by its ID 
    removeList: (state, action) => {
      const { id, data: listId } = action.payload;
      if (state[id]) {
        state[id] = state[id].filter((list) => list.id !== listId);
      }
    },
  },
});

export const { setLists, addList, removeList } = listSlice.actions;
export default listSlice.reducer;
