import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "lists",
    initialState: {},
    reducers: {
        setLists: (state, action) => {
            state[action.payload.id] = action.payload.data;
        },
        addList: (state, action) => {
            state[action.payload.id].push(action.payload.data);
        },
        removeList: (state, action) => {
            state[action.payload.id] = state[action.payload.id].filter(
                (list) => list.id !== action.payload.data
            );
        },
    },
});

export const { setLists, addList, removeList } = listSlice.actions;
export default listSlice.reducer;
