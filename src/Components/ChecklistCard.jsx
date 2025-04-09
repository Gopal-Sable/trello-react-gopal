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
import { useDispatch } from "react-redux";
import { addCheckItem, removeChecklist } from "../features/checklistSlice";

//  this is  checklist
export const ChecklistCard = ({ checklist, cardId }) => {
    const dispatch = useDispatch();
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
            dispatch(
                removeChecklist({ id: cardId, checklistId: checklist.id })
            );
        } catch (err) {
            console.error("Failed to delete checklist", err);
        }
        setIsLoading((prev) => ({ ...prev, delete: false }));
    };

    const handleCreateItem = async () => {
        if (!newItemName.trim()) return;
        try {
            setIsLoading((prev) => ({ ...prev, add: true }));
            const { data } = await checklistAPIs.createChecklistItem(
                checklist.id,
                newItemName
            );
            dispatch(addCheckItem({ cardId, id: checklist.id, data }));
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
                {calculateProgress(checklist.checkItems)} %
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
                {/* delete a checklist */}
                <Button
                    size="small"
                    color="error"
                    onClick={handleDeleteChecklist}
                    loading={isLoading.delete}
                >
                    Delete
                </Button>
            </Box>
            {/* Show all check-items */}
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
                            dispatch={dispatch}
                            checklistId={checklist.id}
                            cardId={cardId}
                        />
                    ))
                )}
            </List>
            {/* Add new check-item */}
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
