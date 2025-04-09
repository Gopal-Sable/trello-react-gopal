import { Box, IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListComponent from "../List";
import { useDispatch } from "react-redux";
import { removeList } from "../../features/listSlice";
import { listAPIs } from "../../utils/apiCalls";

const ListSection = ({ boardId, lists, setError }) => {
    const dispatch = useDispatch();

    const handleArchiveList = async (listId) => {
        const { error } = await listAPIs.archiveList(listId);
        if (error) setError(error);
        else dispatch(removeList({ id: boardId, data: listId }));
    };

    return (
        <>
            {lists.map((list) => (
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
