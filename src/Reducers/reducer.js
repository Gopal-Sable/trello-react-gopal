export default function checklistReducer(state, action) {
    switch (action.type) {
        case "SET_DATA":
            return action.payload;
        case "ADD_DATA":
            return [...state, action.payload];
        case "REMOVE_DATA":
            return state.filter((checklist) => checklist.id !== action.payload);
        case "TOGGLE_CHECKITEM":
            return state.map((checklist) => {
                if (checklist.id === action.payload.checklistId) {
                    return {
                        ...checklist,
                        checkItems: checklist.checkItems.map((item) => {
                            if (item.id === action.payload.checkItemId) {
                                return {
                                    ...item,
                                    state:
                                        item.state === "complete"
                                            ? "incomplete"
                                            : "complete",
                                };
                            }
                            return item;
                        }),
                    };
                }
                return checklist;
            });
        case "DELETE_ITEM":
            return state.map((checklist) =>
                checklist.id === action.payload.id
                    ? {
                          ...checklist,
                          checkItems: checklist.checkItems.filter(
                              (item) => item.id !== action.payload.checkedId
                          ),
                      }
                    : checklist
            );
        case "CREATE_ITEM":
            return state.map((list) =>
                list.id === action.payload.id
                    ? {
                          ...list,
                          checkItems: [...list.checkItems, action.payload.data],
                      }
                    : list
            );
        case "CHECK_CARD":
            return state.map((card) =>
                card.id === action.payload
                    ? { ...card, dueComplete: !card.dueComplete }
                    : card
            );
        default:
            return state;
    }
}
