export default function listsReducer(state, action) {
    switch (action.type) {
        case "SET_LISTS":
            return action.payload;
        case "ADD_LIST":
            return [...state, action.payload];
        case "REMOVE_LIST":
            return state.filter((list) => list.id !== action.payload);
        default:
            return state;
    }
}
