import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddNewBoardModal from "./AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import { boardAPIs } from "../utils/apiCalls";
import BoardCard from "./BoardCard";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, setBoards } from "../features/boardSlice";

const BoardList = () => {
    const dispatch = useDispatch();
    const boards = useSelector((store) => store.board);
    const [loading, setLoading] = useState(true);

    const createBoard = async (name) => {
        const { data, error } = await boardAPIs.createBoard(name);
        if (error) {
            return alert("Error creating board", error);
        }
        dispatch(addBoard(data));
    };

    useEffect(() => {
        (async () => {
            try {
                const { data, error } = await boardAPIs.getAllBoards();
                if (error) throw Error(error);
                dispatch(setBoards(data));
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "grey.100" }}>
            <Typography variant="h4" fontWeight={600} mb={3}>
                My Boards
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 3,
                }}
            >
                <AddNewBoardModal
                    name="Add new Board"
                    handleSubmit={createBoard}
                >
                    <Box
                        sx={{
                            height: 120,
                            width: 250,
                            borderRadius: 2,
                            bgcolor: "grey.200",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "grey.300" },
                        }}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        <Typography>Create new board</Typography>
                    </Box>
                </AddNewBoardModal>
                {loading
                    ? [...Array(6)].map((_, i) => (
                          <Skeleton
                              key={i}
                              variant="rounded"
                              width={250}
                              height={120}
                              sx={{ borderRadius: 2 }}
                          />
                      ))
                    : //   showing all boards
                      boards.map((board) => (
                          <BoardCard key={board.id} {...board} />
                      ))}
            </Box>
        </Box>
    );
};

export default BoardList;
