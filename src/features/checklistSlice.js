import { createSlice } from "@reduxjs/toolkit";

const checklistSlice = createSlice({
    name: "checklists",
    initialState: {},
    reducers: {
        setChecklists: (state, action) => {
            state[action.payload.id] = action.payload.data;
        },
        addChecklist: (state, action) => {
            state[action.payload.id].push(action.payload.data);
        },
        removeChecklist: (state, action) => {
            const { id, checklistId } = action.payload;
            state[id] = state[id].filter((list) => list.id !== checklistId);
        },
        toggleCheckItem: (state, action) => {
            const { checklistId, checkItemId, cardId } = action.payload;
            state[cardId] = state[cardId].map((list) =>
                list.id === checklistId
                    ? {
                          ...list,
                          checkItems: list.checkItems.map((item) =>
                              item.id === checkItemId
                                  ? {
                                        ...item,
                                        state:
                                            item.state === "complete"
                                                ? "incomplete"
                                                : "complete",
                                    }
                                  : item
                          ),
                      }
                    : list
            );
        },
        deleteCheckItem: (state, action) => {
            const { checklistId, checkItemId, cardId } = action.payload;
            state[cardId] = state[cardId].map((list) =>
                list.id === checklistId
                    ? {
                          ...list,
                          checkItems: list.checkItems.filter(
                              (item) => item.id !== checkItemId
                          ),
                      }
                    : list
            );
        },
        addCheckItem: (state, action) => {
            // dispatch(addCheckItem({ cardId, id: checklist.id, data }));
            const { id, data, cardId } = action.payload;
            state[cardId] = state[cardId].map((list) => {
                return list.id === id
                    ? { ...list, checkItems: [...list.checkItems, data] }
                    : list;
            });
            //
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
