import { ListItem, Checkbox, ListItemText, Button } from "@mui/material";
import { checklistAPIs } from "../utils/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCheckItem, toggleCheckItem } from "../features/checklistSlice";

export const ChecklistItem = ({ item, checklistId, cardId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleToggleItem = async (itemId, currentState) => {
        try {
            await checklistAPIs.toggleChecklistItem(
                cardId,
                checklistId,
                itemId,
                currentState
            );
            dispatch(
                toggleCheckItem({ cardId, checklistId, checkItemId: itemId })
            );
        } catch (err) {
            console.error("Failed to update item", err);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            setIsLoading(true);
            await checklistAPIs.deleteChecklistItem(checklistId, itemId);
            // const { checklistId, checkItemId, cardId }
            dispatch(
                deleteCheckItem({ checklistId, checkItemId: itemId, cardId })
            );
        } catch (err) {
            console.error("Failed to delete item", err);
        }

        setIsLoading(false);
    };

    return (
        <ListItem sx={{ p: 0, "&:hover": { backgroundColor: "action.hover" } }}>
            <Checkbox
                checked={item.state === "complete"}
                onChange={() => handleToggleItem(item.id, item.state)}
                sx={{ mr: 1 }}
            />
            <ListItemText
                primary={item.name}
                sx={{
                    textDecoration:
                        item.state === "complete" ? "line-through" : "none",
                    color:
                        item.state === "complete"
                            ? "text.secondary"
                            : "text.primary",
                }}
            />
            <Button
                size="small"
                color="error"
                loading={isLoading}
                onClick={() => handleDeleteItem(item.id)}
            >
                Delete
            </Button>
        </ListItem>
    );
};
