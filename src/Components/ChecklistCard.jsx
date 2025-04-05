import {
    Card,
    Box,
    Typography,
    Button,
    List,
    LinearProgress,
    Input,
} from "@mui/material";
import { ChecklistItem } from "./ChecklistItem";
import { checklistAPIs } from "../utils/apiCalls";
import { useState } from "react";

export const ChecklistCard = ({ checklist, dispatch, cardId }) => {
    const [newItemName, setNewItemName] = useState("");
    const [isLoading, setIsLoading] = useState({
        add: false,
        delete: false,
        itemDelete: false,
    });

    const calculateProgress = (items) => {
        if (!items?.length) return 0;
        const completed = items.filter((i) => i.state === "complete").length;
        return Math.round((completed / items.length) * 100);
    };

    const handleDeleteChecklist = async () => {
        try {
            setIsLoading((prev) => ({ ...prev, delete: true }));
            await checklistAPIs.deleteChecklist(checklist.id);
            dispatch({ type: "REMOVE_CHECKLIST", payload: checklist.id });
        } catch (err) {
            console.error("Failed to delete checklist", err);
        }
        setIsLoading((prev) => ({ ...prev, delete: false }));
    };

    const handleToggleItem = async (itemId, currentState) => {
        try {
            await checklistAPIs.toggleChecklistItem(
                cardId,
                checklist.id,
                itemId,
                currentState
            );
            dispatch({
                type: "TOGGLE_CHECKITEM",
                payload: { checklistId: checklist.id, checkItemId: itemId },
            });
        } catch (err) {
            console.error("Failed to update item", err);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            setIsLoading((prev) => ({ ...prev, itemDelete: true }));
            await checklistAPIs.deleteChecklistItem(checklist.id, itemId);
            dispatch({
                type: "DELETE_ITEM",
                payload: { id: checklist.id, checkedId: itemId },
            });
        } catch (err) {
            console.error("Failed to delete item", err);
        }

        setIsLoading((prev) => ({ ...prev, itemDelete: false }));
    };

    const handleCreateItem = async () => {
        if (!newItemName.trim()) return;
        try {
            setIsLoading((prev) => ({ ...prev, add: true }));
            const {data} = await checklistAPIs.createChecklistItem(
                checklist.id,
                newItemName
            );
            dispatch({
                type: "CREATE_ITEM",
                payload: { id: checklist.id, data },
            });
            setNewItemName("");
        } catch (err) {
            console.error("Failed to create item", err);
        }
        setIsLoading((prev) => ({ ...prev, add: false }));
    };

    return (
        <Card sx={{ mb: 2, p: 2 }}>
            <Box sx={{ width: "100%", mb: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={calculateProgress(checklist.checkItems)}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Typography variant="subtitle1">{checklist.name}</Typography>
                <Button
                    size="small"
                    color="error"
                    onClick={handleDeleteChecklist}
                    loading={isLoading.delete}
                >
                    Delete
                </Button>
            </Box>
            <List dense>
                {checklist.checkItems?.length === 0 ? (
                    <Typography variant="body2" sx={{ px: 2, py: 1 }}>
                        No items in this checklist
                    </Typography>
                ) : (
                    checklist.checkItems?.map((item) => (
                        <ChecklistItem
                            key={item.id}
                            item={item}
                            onToggle={() =>
                                handleToggleItem(item.id, item.state)
                            }
                            onDelete={() => handleDeleteItem(item.id)}
                            isLoading={isLoading}
                        />
                    ))
                )}
            </List>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Input
                    fullWidth
                    placeholder="Add new item"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateItem()}
                />
                <Button
                    variant="outlined"
                    onClick={handleCreateItem}
                    disabled={!newItemName.trim()}
                    loading={isLoading.add}
                >
                    Add
                </Button>
            </Box>
        </Card>
    );
};
