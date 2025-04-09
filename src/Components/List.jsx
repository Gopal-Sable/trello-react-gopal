import { Box, Card, ListSubheader, TextField, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CardComponent from "./CardComponent";
import { useDispatch, useSelector } from "react-redux";
import { cardAPIs } from "../utils/apiCalls";
import { setCards, addCard } from "../features/cardSlice";

const ListComponent = ({ listName, id }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card);
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await cardAPIs.getAllCards(id);
      dispatch(setCards({id,data}));
    };
    fetchCards();
  }, []);
  // id, dispatch
  const handleAddCard = async () => {
    if (!cardName.trim()) return;
    setLoading(true);
    const { data } = await cardAPIs.addCard(id, cardName);
    dispatch(addCard({id,data}));
    setCardName("");
    setShowAddCard(false);
    setLoading(false);
  };

  return (
    <Card sx={{ width: 272, bgcolor: "#ebecf0", p: 1 }}>
      <ListSubheader sx={{ fontWeight: 600 }}>{listName}</ListSubheader>
      
      {cards[id]?.map((card) => (
        <CardComponent key={card.id} {...card} listId={id} />
      ))}

      {showAddCard ? (
        <Box sx={{ p: 1 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter card title..."
            onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
          />
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleAddCard}
              disabled={!cardName.trim() || loading}
            >
              Add Card
            </Button>
            <IconButton onClick={() => setShowAddCard(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
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