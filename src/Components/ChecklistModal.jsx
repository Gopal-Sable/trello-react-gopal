import { useEffect, useState } from "react";
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
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { checklistAPIs } from "../utils/apiCalls";

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
    const [checkListData, setCheckListData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        async function getChecklist(id) {
            const data = await checklistAPIs.getChecklists(id);
            setCheckListData(data);
        }
        getChecklist(cardId);
    }, []);
    // https://api.trello.com/1/cards/{id}/checklists?key=APIKey&token=APIToken
    const createChecklist = async () => {
        const { data } = await axios.post(
            `${BASE_URL}1/cards/${cardId}/checklists`,
            null,
            {
                params: { key, token, name: inputValue },
            }
        );
        setCheckListData([...checkListData, data]);
    };
    const deleteChecklist = async (id) => {
        const { data } = await axios.delete(`${BASE_URL}1/checklists/${id}`, {
            params: { key, token },
        });
        setCheckListData(
            checkListData.filter((checklist) => id !== checklist.id)
        );
    };

    const checkedItem = async () => {
        // const { data } = await axios.delete(`${BASE_URL}1/checklists/${id}`, {
        //     params: { key, token },
        // });
        // setCheckListData();
    };
    const deleteItem = async (id, checkedId) => {
        // https://api.trello.com/1/checklists/{id}/checkItems/{idCheckItem}?
        const { data } = await axios.delete(
            `${BASE_URL}1/checklists/${id}/checkItems/${checkedId}`,
            {
                params: { key, token },
            }
        );

        setCheckListData(
            checkListData.map((checklist) =>
                checklist.id === id
                    ? {
                          ...checklist,
                          checkItems: checklist.checkItems.filter(
                              (item) => item.id !== checkedId
                          ),
                      }
                    : checklist
            )
        );
    };
    const createItem = async (id) => {
        // https://api.trello.com/1/checklists/{id}/checkItems?name={name}
        const { data } = await axios.post(
            `${BASE_URL}1/checklists/${id}/checkItems`,
            null,
            {
                params: { key, token, name: itemValue },
            }
        );
        setCheckListData(
            checkListData.map((list) =>
                list.id === id
                    ? { ...list, checkItems: [...list.checkItems, data] }
                    : list
            )
        );
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
                                <ListItemButton>
                                    <ListItemText primary={name} />
                                    <List>
                                        {checkItems.map(
                                            ({
                                                id: checkedId,
                                                name,
                                                state,
                                            }) => {
                                                return (
                                                    <ListItem key={checkedId}>
                                                        <Checkbox
                                                            checked={
                                                                state ===
                                                                "complete"
                                                            }
                                                            onChange={() => {}}
                                                            sx={{
                                                                p: 0,
                                                                zIndex:10,
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
                                </ListItemButton>
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
