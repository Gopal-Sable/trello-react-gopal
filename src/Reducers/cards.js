
export default function cardsReducer(state, action) {
    switch (action.type) {
        case "SET_CARDS":
            return action.payload;
        case "ADD_CARD":
            return [...state, action.payload];
        case "REMOVE_CARDS":
            return state.filter((card) => card.id !== action.payload);
        case "CHECK_CARD":
            return state.map((card) =>
                card.id === action.payload ? { ...card, dueComplete:!card.dueComplete } : card
            );
        default:
            return state;
    }
}

