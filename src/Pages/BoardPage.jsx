import { Box} from "@mui/material";
import { useParams } from "react-router";
import { useDispatch} from "react-redux";
import { setOpenBoard } from "../features/listSlice";
import CreateListButton from "../Components/List/CreateListButton";
import ListSection from "../Components/List/ListSection";

const BoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    dispatch(setOpenBoard(id));

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
