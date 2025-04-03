import { Box, Button, IconButton, Snackbar, Alert } from "@mui/material";
import ListComponent from "../Components/List";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import AddNewModal from "../Components/AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import listsReducer from "../Reducers/lists";
import { listAPIs } from "../utils/apiCalls";

const BoardPage = () => {
    const { id } = useParams();
    const [lists, dispatch] = useReducer(listsReducer, []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data, error } = await listAPIs.getLists(id);
            if (error) {
                setError(error);
            } else {
                dispatch({ type: "SET_LISTS", payload: data });
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (name) => {
        const { data, error } = await listAPIs.createList(id, name);
        if (error) {
            setError(error);
        } else {
            dispatch({ type: "ADD_LIST", payload: data });
        }
    };

    const handleArchive = async (listId) => {
        const { error } = await listAPIs.archiveList(listId);
        if (error) {
            setError(error);
        } else {
            dispatch({ type: "REMOVE_LIST", payload: listId });
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    p: 2,
                    gap: 2,
                    overflowX: "auto",
                    minHeight: "calc(100vh - 64px)",
                    alignItems: "flex-start",
                }}
            >
                <Box sx={{ minWidth: 272, flexShrink: 0 }}>
                    <AddNewModal
                        name="Add New List"
                        handleSubmit={handleSubmit}
                    >
                        <Button
                            fullWidth
                            startIcon={<AddIcon />}
                            sx={{
                                height: 40,
                                bgcolor: "#ebecf0",
                                justifyContent: "flex-start",
                                borderRadius: 1,
                                px: 2,
                                color: "grey.600",
                                "&:hover": {
                                    bgcolor: "#dadbe2",
                                },
                            }}
                        >
                            Add another list
                        </Button>
                    </AddNewModal>
                </Box>

                {loading &&
                    [...Array(3)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: 272,
                                height: "100%",
                                bgcolor: "grey.300",
                                borderRadius: 1,
                                flexShrink: 0,
                            }}
                        />
                    ))}

                {lists.map(({ name, id }) => (
                    <Box
                        key={id}
                        sx={{
                            position: "relative",
                            minWidth: 272,
                            flexShrink: 0,
                        }}
                    >
                        <IconButton
                            onClick={() => handleArchive(id)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                zIndex: 1,
                                color: "grey.600",
                                "&:hover": {
                                    color: "error.main",
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                },
                            }}
                        >
                            <ArchiveIcon fontSize="small" />
                        </IconButton>
                        <ListComponent listName={name} id={id} />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default BoardPage;
