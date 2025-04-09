import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const checklistSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {
      setChecklists: (state, action) => {
      const { id, data } = action.payload;
      state[id] = data;
    },

    // Add a new checklist to a card
    addChecklist: (state, action) => {
      const { id, data } = action.payload;
      if (!state[id]) state[id] = [];
      state[id].push(data);
    },

    // Remove a checklist from a card
    removeChecklist: (state, action) => {
      const { id, checklistId } = action.payload;
      if (state[id]) {
        state[id] = state[id].filter((list) => list.id !== checklistId);
      }
    },

    // Toggle the state of a check item within a checklist
    toggleCheckItem: (state, action) => {
      const { checklistId, checkItemId, cardId } = action.payload;
      if (!state[cardId]) return;

      state[cardId] = state[cardId].map((list) =>
        list.id === checklistId
          ? {
              ...list,
              checkItems: list.checkItems.map((item) =>
                item.id === checkItemId
                  ? {
                      ...item,
                      state: item.state === "complete" ? "incomplete" : "complete",
                    }
                  : item
              ),
            }
          : list
      );
    },

    // Delete a check item from a checklist
    deleteCheckItem: (state, action) => {
      const { checklistId, checkItemId, cardId } = action.payload;
      if (!state[cardId]) return;

      state[cardId] = state[cardId].map((list) =>
        list.id === checklistId
          ? {
              ...list,
              checkItems: list.checkItems.filter((item) => item.id !== checkItemId),
            }
          : list
      );
    },

    // Add a check item to a checklist
    addCheckItem: (state, action) => {
      const { id, data, cardId } = action.payload;
      if (!state[cardId]) return;

      state[cardId] = state[cardId].map((list) =>
        list.id === id
          ? {
              ...list,
              checkItems: [...list.checkItems, data],
            }
          : list
      );
    },
  },
});

export const {
  setChecklists,
  addChecklist,
  removeChecklist,
  toggleCheckItem,
  deleteCheckItem,
  addCheckItem,
} = checklistSlice.actions;

export default checklistSlice.reducer;
