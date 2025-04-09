import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listAPIs } from "../utils/apiCalls";
import { setLists, addList } from "../features/listSlice";
import CreateListButton from "../Components/List/CreateListButton";
import ListSection from "../Components/List/ListSection";

const BoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.list);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (lists[id]) {
            setLoading(false);
            return;
        }

        const fetchLists = async () => {
            const { data, error } = await listAPIs.getLists(id);
            if (error) setError(error);
            else dispatch(setLists({ id, data }));
            setLoading(false);
        };

        fetchLists();
    }, [id, dispatch, lists]);

    const handleCreateList = async (name) => {
        const { data, error } = await listAPIs.createList(id, name);
        if (error) setError(error);
        else dispatch(addList({ id, data }));
    };

    if (loading) return <CircularProgress sx={{ m: 4 }} />;
    if (error) return <Typography color="error">{error}</Typography>;

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
            <CreateListButton handleCreateList={handleCreateList} />
            <ListSection boardId={id} lists={lists[id]} setError={setError} />
        </Box>
    );
};

export default BoardPage;
