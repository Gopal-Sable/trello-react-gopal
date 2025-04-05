import axios from "axios";
import { BASE_URL } from "./constants";

const key = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export const listAPIs = {
    async getLists(boardId) {
        try {
            const { data } = await axios.get(
                `${BASE_URL}1/boards/${boardId}/lists`,
                {
                    params: { key, token },
                }
            );
            return { data, error: null };
        } catch (error) {
            console.error("Error fetching lists:", error);
            return { data: null, error: "Failed to load lists" };
        }
    },

    async createList(boardId, name) {
        try {
            const { data } = await axios.post(
                `${BASE_URL}1/boards/${boardId}/lists`,
                null,
                {
                    params: { name, key, token },
                }
            );
            return { data, error: null };
        } catch (error) {
            console.error("Error adding list:", error);
            return { data: null, error: "Failed to create list" };
        }
    },

    async archiveList(listId) {
        try {
            await axios.put(`${BASE_URL}1/lists/${listId}`, null, {
                params: { key, token, closed: true },
            });
            return { error: null };
        } catch (error) {
            console.error("Error archiving list:", error);
            return { error: "Failed to archive list" };
        }
    },
};

export const boardAPIs = {
    async createBoard(name) {
        try {
            const { data } = await axios.post(`${BASE_URL}1/boards`, null, {
                params: {
                    name,
                    key,
                    token,
                },
            });
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error creating board" };
        }
    },
    async getAllBoards() {
        try {
            const { data } = await axios.get(`${BASE_URL}1/members/me/boards`, {
                params: {
                    key,
                    token,
                },
            });
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error creating board" };
        }
    },
};

export const cardAPIs = {
    async getAllCards(id) {
        try {
            const { data } = await axios.get(`${BASE_URL}1/list/${id}/cards`, {
                params: {
                    key,
                    token,
                },
            });
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error fetching cards" };
        }
    },
    async deleteCard(id) {
        try {
            const { data } = await axios.delete(`${BASE_URL}1/cards/${id}`, {
                params: {
                    key,
                    token,
                },
            });
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error deleting card" };
        }
    },
    async addCard(id, name) {
        try {
            const { data } = await axios.post(`${BASE_URL}1/cards/`, null, {
                params: {
                    idList: id,
                    name,
                    key,
                    token,
                },
            });
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error deleting card" };
        }
    },
    async toggleComplete(cardId, dueComplete) {
        try {
            const { data } = await axios.put(
                `${BASE_URL}1/cards/${cardId}`,
                null,
                {
                    params: {
                        dueComplete,
                        key,
                        token,
                    },
                }
            );
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error deleting card" };
        }
    },
};
export const checklistAPIs = {
    async getChecklists(id) {
        try {
            const { data } = await axios.get(
                `${BASE_URL}1/cards/${id}/checklists`,
                {
                    params: { key, token },
                }
            );
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error fetching checklist" };
        }
    },

    async createChecklist(cardId, name) {
        try {
            const { data } = await axios.post(
                `${BASE_URL}1/cards/${cardId}/checklists`,
                { name },
                { params: { key, token } }
            );
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error creating checklist" };
        }
    },

    async deleteChecklist(checklistId) {
        try {
            await axios.delete(`${BASE_URL}1/checklists/${checklistId}`, {
                params: { key, token },
            });
            return { error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error deleting checklist" };
        }
    },

    async toggleChecklistItem(cardId, checklistId, checkItemId, currentState) {
        try {
            await axios.put(
                `${BASE_URL}1/cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}`,
                {
                    state:
                        currentState === "complete" ? "incomplete" : "complete",
                },
                { params: { key, token } }
            );
            return { error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Something went wrong" };
        }
    },

    async deleteChecklistItem(checklistId, checkItemId) {
        try {
            await axios.delete(
                `${BASE_URL}1/checklists/${checklistId}/checkItems/${checkItemId}`,
                { params: { key, token } }
            );
            return { error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error deleting checklist item" };
        }
    },

    async createChecklistItem(checklistId, name) {
        try {
            const { data } = await axios.post(
                `${BASE_URL}1/checklists/${checklistId}/checkItems`,
                { name },
                { params: { key, token } }
            );
            return { data, error: null };
        } catch (error) {
            console.error("Error :", error);
            return { error: "Error creating checkItem" };
        }
    },
};
