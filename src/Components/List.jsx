import {
    Card,
    ListSubheader,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CardComponent from "./CardComponent";
import { useDispatch, useSelector } from "react-redux";
import { cardAPIs } from "../utils/apiCalls";
import { setCards, addCard } from "../features/cardSlice";
import AddCardForm from "./Cards/AddCardForm";

const ListComponent = ({ listName, id }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.card[id]);
    const [showAddCard, setShowAddCard] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            if (cards?.length > 0) return;

            const { data, error } = await cardAPIs.getAllCards(id);
            if (!error) dispatch(setCards({ id, data }));
        };
        fetchCards();
    }, [id]);

    return (
        <Card sx={{ width: 272, bgcolor: "#ebecf0", p: 1 }}>
            <ListSubheader sx={{ fontWeight: 600 }}>{listName}</ListSubheader>

            {cards?.map((card) => (
                <CardComponent key={card.id} {...card} listId={id} />
            ))}

            {showAddCard ? (
                <AddCardForm
                    id={id}
                    onClose={() => setShowAddCard(false)}
                   
                />
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddCard(true)}
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                >
                    Add a card
                </Button>
            )}
        </Card>
    );
};

export default ListComponent;
