export default function boardsReducer(state, action) {
    switch (action.type) {
        case "SET_BOARDS":
            return action.payload;
        case "ADD_BOARD":
            return [...state, action.payload];
        default:
            return state;
    }
}
