import {
    Box,
    Card,
    CardContent,
    Checkbox,
    IconButton,
    Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React, { useState } from "react";
import ChecklistModal from "./ChecklistModal";
import { cardAPIs } from "../utils/apiCalls";
import { useDispatch } from "react-redux";
import { removeCard, toggleCard } from "../features/cardSlice";

const CardComponent = ({ id, name, dueComplete, listId }) => {
    const dispatch = useDispatch();
    const deleteCard = async (cardId) => {
        try {
            setIsLoading(true);
            await cardAPIs.deleteCard(id);
            dispatch(removeCard({ id: listId, cardId }));
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleComplete = async (cardId, dueComplete) => {
        try {
            await cardAPIs.toggleComplete(cardId, dueComplete);
            dispatch(toggleCard({ id: listId, data: cardId }));
        } catch (error) {
            alert("Error occurred");
        }
    };
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Card
            key={id}
            sx={{
                bgcolor: "white",
                boxShadow: "0 1px 0 rgba(9,30,66,.25)",
                borderRadius: 1,
                p: 1,
                "&:hover": {
                    bgcolor: "#f4f5f7",
                    "& .card-actions": {
                        visibility: "visible",
                    },
                },
                ...(dueComplete && {
                    bgcolor: "#f8f9fa",
                    color: "text.secondary",
                    textDecoration: "line-through",
                }),
            }}
        >
            <CardContent sx={{ p: "8px !important" }}>
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleOutlineIcon color="primary" />}
                        checked={dueComplete}
                        onChange={() => toggleComplete(id, !dueComplete)}
                        sx={{
                            p: 0,
                            "&:hover": {
                                bgcolor: "transparent",
                            },
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
                        {/* delete the card */}
                        <IconButton
                            loading={isLoading}
                            size="small"
                            onClick={() => {
                                deleteCard(id);
                            }}
                            sx={{ color: "grey.600" }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
