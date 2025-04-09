import { Box, Button, IconButton, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddNewModal from "../Components/AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListComponent from "../Components/List";
import { useDispatch, useSelector } from "react-redux";
import { listAPIs } from "../utils/apiCalls";
import { setLists, addList, removeList } from "../features/listSlice";

const BoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.list);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLists = async () => {
            const { data, error } = await listAPIs.getLists(id);
            if (error) setError(error);
            else dispatch(setLists({ id, data }));
            setLoading(false);
        };
        fetchLists();
    }, [id, dispatch]);

    const handleCreateList = async (name) => {
        const { data, error } = await listAPIs.createList(id, name);
        if (error) setError(error);
        else dispatch(addList({ id, data }));
    };

    const handleArchiveList = async (listId) => {
        const { error } = await listAPIs.archiveList(id,listId);
        if (error) setError(error);
        else dispatch(removeList({ id, listId }));
    };

    if (loading) return <CircularProgress />;

    return (
        <Box
            sx={{
                p: 2,
                display: "flex",
                gap: 2,
                overflowX: "auto",
                minHeight: "calc(100vh - 64px)",
            }}
        >
            <AddNewModal name="Add List" handleSubmit={handleCreateList}>
                <Button
                    startIcon={<AddIcon />}
                    sx={{ minWidth: 272, justifyContent: "flex-start" }}
                >
                    Add another list
                </Button>
            </AddNewModal>

            {lists[id].map((list) => (
                <Box key={list.id} sx={{ position: "relative", minWidth: 272 }}>
                    <IconButton
                        onClick={() => handleArchiveList(list.id)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            zIndex: 1,
                        }}
                    >
                        <ArchiveIcon fontSize="small" />
                    </IconButton>
                    <ListComponent listName={list.name} id={list.id} />
                </Box>
            ))}
        </Box>
    );
};

export default BoardPage;
