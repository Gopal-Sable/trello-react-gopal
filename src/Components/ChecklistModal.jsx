import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
    Card,
    Checkbox,
    Input,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { checklistAPIs } from "../utils/apiCalls";
import checklistReducer from "../Reducers/checklist";

const key = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ChecklistModal({ name, cardId }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [itemValue, setItemValue] = useState("");
    const [checkListData, dispatch] = useReducer(checklistReducer, []);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        async function getChecklist(id) {
            const data = await checklistAPIs.getChecklists(id);
            dispatch({ type: "SET_CHECKLISTS", payload: data });
        }
        getChecklist(cardId);
    }, []);
    const createChecklist = async () => {
        const { data } = await axios.post(
            `${BASE_URL}1/cards/${cardId}/checklists`,
            null,
            {
                params: { key, token, name: inputValue },
            }
        );
        dispatch({ type: "ADD_CHECKLIST", payload: data });
    };
    const deleteChecklist = async (id) => {
        const { data } = await axios.delete(`${BASE_URL}1/checklists/${id}`, {
            params: { key, token },
        });

        dispatch({ type: "REMOVE_CHECKLISTS", payload: id });
    };

    const checkedItem = async (state, cardId, checkItemId) => {
        const { data } = await axios.put(
            `${BASE_URL}1/cards/${cardId}/checkItem/${checkItemId}`,
            null,
            {
                params: {
                    state: state == "complete" ? "incomplete" : "complete",
                    key,
                    token,
                },
            }
        );
            // CREATE THIS 
        // dispatch({type:"REMOVE_CHECKLISTS",payload:id})
        // setCheckListData(checkListData.map((list)=>))
    };
    const deleteItem = async (id, checkedId) => {
        const { data } = await axios.delete(
            `${BASE_URL}1/checklists/${id}/checkItems/${checkedId}`,
            {
                params: { key, token },
            }
        );
        dispatch({ action: "DELETE_ITEM", payload: { id, checkedId } });
    };
    const createItem = async (id) => {
        const { data } = await axios.post(
            `${BASE_URL}1/checklists/${id}/checkItems`,
            null,
            {
                params: { key, token, name: itemValue },
            }
        );
        dispatch({ action: "CREATE_ITEM", payload: { id, data } });
    };
    return (
        <div>
            <Button onClick={handleOpen}>{name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={createChecklist}>create checkList</button>

                    <List>
                        {checkListData.map(({ id, name, checkItems }) => (
                            <ListItem
                                key={id}
                                disablePadding
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box sx={{ width: "100%" }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={50}
                                    />
                                </Box>
                                <ListItemText primary={name} />

                                <List>
                                    {checkItems.map(
                                        ({ id: checkedId, name, state }) => {
                                            return (
                                                <ListItem key={checkedId}>
                                                    <Checkbox
                                                        checked={
                                                            state === "complete"
                                                        }
                                                        onChange={() => {
                                                            checkedItem(
                                                                state,
                                                                cardId,
                                                                checkedId
                                                            );
                                                        }}
                                                        sx={{
                                                            p: 0,
                                                            zIndex: 10,
                                                            "&:hover": {
                                                                bgcolor:
                                                                    "transparent",
                                                            },
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary={name}
                                                    />
                                                    <Button
                                                        sx={{
                                                            zIndex: "10",
                                                        }}
                                                        onClick={() =>
                                                            deleteItem(
                                                                id,
                                                                checkedId
                                                            )
                                                        }
                                                    >
                                                        Delete Item
                                                    </Button>
                                                </ListItem>
                                            );
                                        }
                                    )}
                                </List>
                                <Input
                                    value={itemValue}
                                    onChange={(e) =>
                                        setItemValue(e.target.value)
                                    }
                                ></Input>
                                <Button onClick={() => createItem(id)}>
                                    add checkItem
                                </Button>
                                <Button
                                    onClick={() => {
                                        deleteChecklist(id);
                                    }}
                                >
                                    Delete checklist
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </div>
    );
}
