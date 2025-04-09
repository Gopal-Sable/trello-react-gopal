import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";
import listReducer from "../features/listSlice";
import checklistReducer from "../features/checklistSlice";
import cardReducer from "../features/cardSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    list: listReducer,
    card: cardReducer,
    checklist: checklistReducer,
  },
});