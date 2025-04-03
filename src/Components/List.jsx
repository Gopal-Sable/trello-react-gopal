import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import TrelloCards from "./TrelloCards";

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
        setCards([...cards, data.data]);
        setCardInput("");
        setShow(false);
    };

    return (
        <List
            sx={{
                height: "100%",
                "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                        backgroundColor: "action.selectedHover",
                    },
                },
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {listName}
                </ListSubheader>
            }
        >
            {cards.map(({ id, name }) => (
                <TrelloCards key={id} id={id} name={name} handleClick={deleteCard}/>
            ))}

            <div>
                {show ? (
                    <>
                        <input
                            type="text"
                            value={cardInput}
                            onChange={(e) => setCardInput(e.target.value)}
                        />
                        <button onClick={() => addCard(cardInput)}>Save</button>
                        <button
                            onClick={() => {
                                setShow(false);
                                setCardInput("");
                            }}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={() => setShow(true)}>Add Card</button>
                )}
            </div>
        </List>
    );
}
