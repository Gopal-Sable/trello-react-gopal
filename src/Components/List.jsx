import {
    ListSubheader,
    TextField,
    Button,
    Card,
    IconButton,
    Box,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import cardsReducer from "../Reducers/reducer";
import { cardAPIs } from "../utils/apiCalls";
import CardComponent from "./CardComponent";

export default function ListComponent({ listName, id }) {
    const [cards, dispatch] = useReducer(cardsReducer, []);
    const [show, setShow] = useState(false);
    const [cardInput, setCardInput] = useState("");
    const [isLoading, setIsLoading] = useState({ delete: false, add: false });
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await cardAPIs.getAllCards(id);
                dispatch({ type: "SET_DATA", payload: data });
            } catch (error) {
                alert("Something went wrong !");
            }
        }
        fetchData();
    }, []);

    const addCard = async (name) => {
        try {
            setIsLoading((prev) => ({ ...prev, add: true }));
            const { data } = await cardAPIs.addCard(id, name);
            dispatch({ type: "ADD_DATA", payload: data });
        } catch (err) {
            alert("Error occurred");
        } finally {
            setCardInput("");
            setShow(false);
            setIsLoading((prev) => ({ ...prev, add: false }));
        }
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
                    <CardComponent
                        key={id}
                        id={id}
                        name={name}
                        dueComplete={dueComplete}
                        dispatch={dispatch}
                    />
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
                            loading={isLoading.add}
                            variant="contained"
                            onClick={() => addCard(cardInput)}
                            disabled={!cardInput.trim()}
                        >
                            Save
                        </Button>
                        <IconButton onClick={() => setShow(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <Button
                    loading={isLoading.add}
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
