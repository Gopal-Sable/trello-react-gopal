// AddCardForm.js
import { Box, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { cardAPIs } from "../../utils/apiCalls";
import { useDispatch } from "react-redux";
import { addCard } from "../../features/cardSlice";

const AddCardForm = ({ onClose, id }) => {
    const [cardName, setCardName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleAdd = async () => {
        if (!cardName.trim()) return;
        setLoading(true);
        try {
            const { data, error } = await cardAPIs.addCard(id, cardName.trim());
            if (!error) {
                dispatch(addCard({ id, data }));
                setCardName("");
                onClose();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <TextField
                autoFocus
                fullWidth
                multiline
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Enter card title..."
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={!cardName.trim() || loading}
                >
                    Add Card
                </Button>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AddCardForm;
