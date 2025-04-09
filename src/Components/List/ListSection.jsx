import { Box, IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListComponent from "../List";
import { useDispatch, useSelector } from "react-redux";
import { removeList, setLists } from "../../features/listSlice";
import { listAPIs } from "../../utils/apiCalls";
import { useEffect, useState } from "react";

const ListSection = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { lists, openBoard } = useSelector((state) => state.list);

    useEffect(() => {
        if (lists[openBoard]) {
            setLoading(false);
            return;
        }

        const fetchLists = async () => {
            const { data, error } = await listAPIs.getLists(openBoard);
            if (error) setError(error);
            else dispatch(setLists(data));
            setLoading(false);
        };

        fetchLists();
    }, [openBoard]);

    const handleArchiveList = async (listId) => {
        const { error } = await listAPIs.archiveList(listId);
        if (error) setError(error);
        else dispatch(removeList({ id: openBoard, data: listId }));
    };

    return (
        <>
            {lists[openBoard]?.map((list) => (
                <Box key={list.id} sx={{ position: "relative", minWidth: 272 }}>
                    <IconButton
                        onClick={() => handleArchiveList(list.id)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            zIndex: 10,
                        }}
                    >
                        <ArchiveIcon fontSize="small" />
                    </IconButton>
                    <ListComponent listName={list.name} id={list.id} />
                </Box>
            ))}
        </>
    );
};

export default ListSection;
