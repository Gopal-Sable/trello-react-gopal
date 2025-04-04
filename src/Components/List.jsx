import {
    List,
    ListSubheader,
    TextField,
    Button,
    Card,
    CardContent,
    IconButton,
    Box,
    Checkbox,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { checklistAPIs } from "../utils/apiCalls";
import ChecklistModal from "./ChecklistModal";

export default function ListComponent({ listName, id }) {
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState(false);
    const [cardInput, setCardInput] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(
                `${BASE_URL}1/list/${id}/cards?key=${
                    import.meta.env.VITE_API_KEY
                }&token=${import.meta.env.VITE_TOKEN}`
            );
            setCards(data.data);
        }
        fetchData();
    }, []);

    const deleteCard = async (id) => {
        const data = await axios.delete(
            `${BASE_URL}1/cards/${id}?&key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}`
        );
        let newCards = cards.filter((card) => card.id !== id);
        setCards(newCards);
    };

    const addCard = async (name) => {
        const data = await axios.post(
            `${BASE_URL}1/cards/?idList=${id}&name=${name}&key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}`
        );
        setCards([...cards, { ...data.data }]);
        setCardInput("");
        setShow(false);
    };

    const toggleComplete = async (cardId, dueComplete) => {
        const data = await axios.put(
            `${BASE_URL}1/cards/${cardId}?dueComplete=${dueComplete}&key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}`
        );
        setCards(
            cards.map((card) =>
                card.id === cardId ? { ...card, dueComplete } : card
            )
        );
    };
 

    return (
        <Card
            sx={{
                width: 272,
                bgcolor: "#ebecf0",
                borderRadius: 2,
                p: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            <ListSubheader
                sx={{
                    fontWeight: 600,
                    bgcolor: "transparent",
                    px: 1,
                    py: 0.5,
                }}
            >
                {listName}
            </ListSubheader>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {cards.map(({ id, name, dueComplete }) => (
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
                            <Stack
                                direction="row"
                                alignItems="flex-start"
                                spacing={1}
                            >
                                <Checkbox
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={
                                        <CheckCircleOutlineIcon color="primary" />
                                    }
                                    checked={dueComplete}
                                    onChange={() =>
                                        toggleComplete(id, !dueComplete)
                                    }
                                    sx={{
                                        p: 0,
                                        "&:hover": {
                                            bgcolor: "transparent",
                                        },
                                    }}
                                />
                                <Box
                                    sx={{
                                        wordBreak: "break-word",
                                        flexGrow: 1,
                                        pt: "2px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <ChecklistModal
                                        cardId={id}
                                        name={"open"}
                                    />
                                    {name}
                                </Box>
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
                                        onClick={() => deleteCard(id)}
                                        sx={{ color: "grey.600" }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {show ? (
                <Box sx={{ p: 1 }}>
                    <TextField
                        fullWidth
                        autoFocus
                        multiline
                        minRows={2}
                        value={cardInput}
                        onChange={(e) => setCardInput(e.target.value)}
                        placeholder="Enter a title for this card..."
                        sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="contained"
                            onClick={() => addCard(cardInput)}
                            disabled={!cardInput.trim()}
                        >
                            Add Card
                        </Button>
                        <IconButton onClick={() => setShow(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => setShow(true)}
                    sx={{
                        justifyContent: "flex-start",
                        color: "text.secondary",
                        "&:hover": {
                            bgcolor: "rgba(9,30,66,.08)",
                        },
                    }}
                >
                    Add a card
                </Button>
            )}
        </Card>
    );
}
