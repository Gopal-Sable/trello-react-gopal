import { createSlice } from "@reduxjs/toolkit";

const checklistSlice = createSlice({
  name: "checklists",
  initialState: [],
  reducers: {
    setChecklists: (state, action) => state[action.payload.id]=action.payload.data,
    addChecklist: (state, {id,data}) => { state[id].push(data); },
    removeChecklist: (state, {id,checklistId}) => state[id].filter(list => list.id !== checklistId),
    toggleCheckItem: (state, action) => {
      const { checklistId, checkItemId } = action.payload;
      const checklist = state.find(list => list.id === checklistId);
      if (checklist) {
        const item = checklist.checkItems.find(item => item.id === checkItemId);
        if (item) item.state = item.state === "complete" ? "incomplete" : "complete";
      }
    },
    deleteCheckItem: (state, action) => {
      const { checklistId, checkItemId } = action.payload;
      const checklist = state.find(list => list.id === checklistId);
      if (checklist) {
        checklist.checkItems = checklist.checkItems.filter(item => item.id !== checkItemId);
      }
    },
    addCheckItem: (state, action) => {
      const { checklistId, checkItem,cardId } = action.payload;
      const checklist = state[cardId].find(list => list.id === checklistId);
      if (checklist) checklist.checkItems.push(checkItem);
    },
  },
});

export const { 
  setChecklists, 
  addChecklist, 
  removeChecklist, 
  toggleCheckItem, 
  deleteCheckItem, 
  addCheckItem 
} = checklistSlice.actions;

export default checklistSlice.reducer;