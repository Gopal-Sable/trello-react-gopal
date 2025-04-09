import axios from "axios";

const BASE_URL = "https://api.trello.com/1/";
const key = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

// Generic API handler
const apiHandler = async (method, endpoint, data = null, params = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      params: { ...params, key, token },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { data: null, error: error.message };
  }
};

// Board APIs
export const boardAPIs = {
  createBoard: (name) => apiHandler("post", "boards", null, { name }),
  getAllBoards: () => apiHandler("get", "members/me/boards"),
};

// List APIs
export const listAPIs = {
  getLists: (boardId) => apiHandler("get", `boards/${boardId}/lists`),
  createList: (boardId, name) => apiHandler("post", `boards/${boardId}/lists`, null, { name }),
  archiveList: (listId) => apiHandler("put", `lists/${listId}`, null, { closed: true }),
};

// Card APIs
export const cardAPIs = {
  getAllCards: (listId) => apiHandler("get", `lists/${listId}/cards`),
  addCard: (listId, name) => apiHandler("post", "cards", null, { idList: listId, name }),
  deleteCard: (cardId) => apiHandler("delete", `cards/${cardId}`),
  toggleComplete: (cardId, dueComplete) => apiHandler("put", `cards/${cardId}`, null, { dueComplete }),
};

// Checklist APIs
export const checklistAPIs = {
  getChecklists: (cardId) => apiHandler("get", `cards/${cardId}/checklists`),
  createChecklist: (cardId, name) => apiHandler("post", `cards/${cardId}/checklists`, { name }),
  deleteChecklist: (checklistId) => apiHandler("delete", `checklists/${checklistId}`),
  createChecklistItem: (checklistId, name) => apiHandler("post", `checklists/${checklistId}/checkItems`, { name }),
  deleteChecklistItem: (checklistId, checkItemId) => apiHandler("delete", `checklists/${checklistId}/checkItems/${checkItemId}`),
  toggleChecklistItem: (cardId, checklistId, checkItemId, state) => apiHandler("put", `cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}`, { state }),
};