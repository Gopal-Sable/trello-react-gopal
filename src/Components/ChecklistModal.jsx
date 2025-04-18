import { useEffect, useReducer, useState } from "react";
import {
    Box,
    Modal,
    Input,
    LinearProgress,
    List,
    Typography,
    Button,
} from "@mui/material";
import { ChecklistCard } from "./ChecklistCard";
import { checklistAPIs } from "../utils/apiCalls";
import checklistReducer from "../Reducers/reducer";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
};

const ChecklistModal = ({ cardId, name }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState({
        data: false,
        creteList: false,
    });
    const [error, setError] = useState(null);
    const [checkListData, dispatch] = useReducer(checklistReducer, []);
    const [newChecklistName, setNewChecklistName] = useState("");

    useEffect(() => {
        if (open && cardId) {
            const fetchData = async () => {
                try {
                    setIsLoading((prev) => ({ ...prev, data: true }));
                    const { data } = await checklistAPIs.getChecklists(cardId);
                    dispatch({ type: "SET_DATA", payload: data });
                } catch (err) {
                    setError("Failed to load checklists");
                    console.error(err);
                } finally {
                    setIsLoading((prev) => ({ ...prev, data: false }));
                }
            };
            fetchData();
        }
    }, [open, cardId]);

    const handleCreateChecklist = async () => {
        if (!newChecklistName.trim()) {
            setError("Checklist name cannot be empty");
            return;
        }
        try {
            setIsLoading((prev) => ({ ...prev, creteList: true }));
            const { data } = await checklistAPIs.createChecklist(
                cardId,
                newChecklistName
            );
            dispatch({ type: "ADD_DATA", payload: data });
        } catch (err) {
            setError("Failed to create checklist");
            console.error(err);
        } finally {
            setNewChecklistName("");
            setIsLoading((prev) => ({ ...prev, creteList: false }));
        }
    };

    return (
        <>
            <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
                {name}
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Checklist Manager
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {isLoading.data && <LinearProgress sx={{ mb: 2 }} />}
                    {/* Add a Checklist  */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Input
                            fullWidth
                            placeholder="New checklist name"
                            value={newChecklistName}
                            onChange={(e) =>
                                setNewChecklistName(e.target.value)
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleCreateChecklist()
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={handleCreateChecklist}
                            disabled={!newChecklistName.trim()}
                            loading={isLoading.creteList}
                        >
                            Add
                        </Button>
                    </Box>

                    {/* display all checklists  */}
                    <List sx={{ width: "100%" }}>
                        {checkListData.length === 0 && !isLoading.data && (
                            <Typography sx={{ textAlign: "center", py: 2 }}>
                                No checklists found
                            </Typography>
                        )}
                        {checkListData.map((checklist) => (
                            <ChecklistCard
                                key={checklist.id}
                                checklist={checklist}
                                dispatch={dispatch}
                                cardId={cardId}
                            />
                        ))}
                    </List>
                </Box>
            </Modal>
        </>
    );
};

export default ChecklistModal;
