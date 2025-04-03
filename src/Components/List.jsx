import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function ListComponent({ listName, id }) {
    const [cards, setCards] = useState([]);
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
            {cards.map((card) => (
                <ListItemButton key={card.id}>
                    <ListItemText primary={card.name} />
                </ListItemButton>
            ))}
        </List>
    );
}
