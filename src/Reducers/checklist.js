export default function checklistReducer(state, action) {
    switch (action.type) {
        case "SET_CHECKLISTS":
            return action.payload;
        case "ADD_CHECKLIST":
            return [...state, action.payload];
        case "REMOVE_CHECKLISTS":
            return state.filter((checklist) => checklist.id !== action.payload);
        // case "CHECK_CHECKLIST":
        //     return state.map((checklist) =>
        //         checklist.id === action.payload ? { ...checklist, dueComplete:!checklist.dueComplete } : checklist
        //     );
        case "DELETE_ITEM":
            return state.map((checklist) =>
                        checklist.id === payload.id
                            ? {
                                  ...checklist,
                                  checkItems: checklist.checkItems.filter(
                                      (item) => item.id !== payload.checkedId
                                  ),
                              }
                            : checklist
                    )
        case "CREATE_ITEM":
            return   state.map((list) =>
                        list.id === payload.id
                            ? { ...list, checkItems: [...list.checkItems, payload.data] }
                            : list
                    )
        default:
            return state;
    }
}
