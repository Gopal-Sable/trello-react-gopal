import { ListItem, Checkbox, ListItemText, Button } from "@mui/material";
import { checklistAPIs } from "../utils/apiCalls";
import { useState } from "react";

export const ChecklistItem = ({ item, dispatch, checklistId, cardId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleToggleItem = async (itemId, currentState) => {
        try {
            await checklistAPIs.toggleChecklistItem(
                cardId,
                checklistId,
                itemId,
                currentState
            );
            dispatch({
                type: "TOGGLE_CHECKITEM",
                payload: { checklistId, checkItemId: itemId },
            });
        } catch (err) {
            console.error("Failed to update item", err);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            setIsLoading(true);
            await checklistAPIs.deleteChecklistItem(checklistId, itemId);
            dispatch({
                type: "DELETE_ITEM",
                payload: { id: checklistId, checkedId: itemId },
            });
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
