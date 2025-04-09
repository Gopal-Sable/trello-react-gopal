import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    setBoards: (state, action) => action.payload,
    addBoard: (state, action) => { state.push(action.payload); },
  },
});

export const { setBoards, addBoard } = boardSlice.actions;
export default boardSlice.reducer;