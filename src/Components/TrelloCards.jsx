import React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import AddNewModal from "./AddNewModal";
import ModalComponent from "./Modal";

const TrelloCards = ({ id, name, handleClick }) => {
    return (
        <ListItemButton key={id}>
            <ModalComponent name={name}/>
                {/* <ListItemText primary={name} /> */}
            {/* </ModalComponent> */}

            <DeleteIcon
                onClick={() => {
                    handleClick(id);
                }}
            />
        </ListItemButton>
    );
};

export default TrelloCards;
