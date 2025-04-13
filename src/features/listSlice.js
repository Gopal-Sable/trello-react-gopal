import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openBoard: null,
    lists: {},
};

const listSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        setOpenBoard: (state, action) => {
            state.openBoard = action.payload;
        },
        // Set all lists to a board
        setLists: (state, action) => {
            state.lists[state.openBoard] = action.payload;
        },

        // Add a list
        addList: (state, action) => {
            if (!state.lists[state.openBoard])
                state.lists[state.openBoard] = [];
            state.lists[state.openBoard].push(action.payload);
        },

        // Remove a list by its ID
        removeList: (state, action) => {
            const { id, data: listId } = action.payload;
            if (state.lists[id]) {
                state.lists[id] = state.lists[id].filter(
                    (list) => list.id !== listId
                );
            }
        },
    },
});

export const { setLists, addList, removeList, setOpenBoard } =
    listSlice.actions;
export default listSlice.reducer;
