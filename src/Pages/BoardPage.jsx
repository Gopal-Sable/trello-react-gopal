import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listAPIs } from "../utils/apiCalls";
import { setLists, addList, setOpenBoard } from "../features/listSlice";
import CreateListButton from "../Components/List/CreateListButton";
import ListSection from "../Components/List/ListSection";

const BoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    dispatch(setOpenBoard(id));
    const [error, setError] = useState(null);

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
            <CreateListButton/>
            <ListSection  />
        </Box>
    );
};

export default BoardPage;
