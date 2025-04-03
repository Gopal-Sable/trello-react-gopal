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
            const { data } = await axios.get(`${BASE_URL}1/members/me/boards`,{
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
