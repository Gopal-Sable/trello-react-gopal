import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddNewBoardModal from "./AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import { boardAPIs } from "../utils/apiCalls";
import BoardCard from "./BoardCard";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, setBoards } from "../features/boardSlice";

const CARD_WIDTH = 250;
const CARD_HEIGHT = 120;

const BoardList = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.board);
    const [loading, setLoading] = useState(true);

    const createBoard = async (name) => {
        const { data, error } = await boardAPIs.createBoard(name);
        if (error) return alert("Error creating board:", error);
        dispatch(addBoard(data));
    };

    useEffect(() => {
        if (boards.length > 0) {
            setLoading(false);
            return;
        }
        const fetchBoards = async () => {
            try {
                const { data, error } = await boardAPIs.getAllBoards();
                if (error) throw Error(error);
                dispatch(setBoards(data));
            } catch (err) {
                console.error("Error fetching boards:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBoards();
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
                            height: CARD_HEIGHT,
                            width: CARD_WIDTH,
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
                    ? Array.from({ length: 6 }).map((_, i) => (
                          <Skeleton
                              key={i}
                              variant="rounded"
                              width={CARD_WIDTH}
                              height={CARD_HEIGHT}
                              sx={{ borderRadius: 2 }}
                          />
                      ))
                    : boards.map((board) => (
                          <BoardCard key={board.id} board={board} />
                      ))}
            </Box>
        </Box>
    );
};

export default BoardList;
