import {
    Box,
    Card,
    CardContent,
    Checkbox,
    IconButton,
    Stack,
    CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { cardAPIs } from "../utils/apiCalls";
import { removeCard, toggleCard } from "../features/cardSlice";
import ChecklistModal from "./ChecklistModal";

//  Styles
const cardStyle = (dueComplete) => ({
    bgcolor: dueComplete ? "#f8f9fa" : "white",
    boxShadow: "0 1px 0 rgba(9,30,66,.25)",
    borderRadius: 1,
    p: 1,
    color: dueComplete ? "text.secondary" : "inherit",
    textDecoration: dueComplete ? "line-through" : "none",
    "&:hover": {
        bgcolor: "#f4f5f7",
        "& .card-actions": {
            visibility: "visible",
        },
    },
});

const CardComponent = ({ id, name, dueComplete, listId }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await cardAPIs.deleteCard(id);
            dispatch(removeCard({ id: listId, cardId: id }));
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = async () => {
        try {
            await cardAPIs.toggleComplete(id, !dueComplete);
            dispatch(toggleCard({ id: listId, data: id }));
        } catch (error) {
            alert("Error occurred");
        }
    };

    return (
        <Card sx={cardStyle(dueComplete)}>
            <CardContent sx={{ p: "8px !important" }}>
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleOutlineIcon color="primary" />}
                        checked={dueComplete}
                        onChange={handleToggle}
                        sx={{
                            p: 0,
                            "&:hover": { bgcolor: "transparent" },
                        }}
                    />

                    <ChecklistModal cardId={id} name={name} />

                    <Box
                        className="card-actions"
                        sx={{
                            visibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={handleDelete}
                            sx={{ color: "grey.600" }}
                        >
                            {isLoading ? (
                                <CircularProgress size={16} />
                            ) : (
                                <DeleteIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
