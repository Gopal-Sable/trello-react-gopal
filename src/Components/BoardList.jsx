import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import AddNewBoardModal from "./AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import { boardAPIs } from "../utils/apiCalls";
import boardsReducer from "../Reducers/boards";

const BoardList = () => {
    const navigate = useNavigate();
    const [boards, dispatch] = useReducer(boardsReducer, []);
    const [loading, setLoading] = useState(true);

    const createBoard = async (name) => {
        const { data, error } = await boardAPIs.createBoard(name);
        if (error) {
            return alert("Error creating board", error);
        }
        dispatch({ type: "ADD_BOARD", payload: data });
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await boardAPIs.getAllBoards();
                dispatch({ type: "SET_BOARDS", payload: data });
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const BoardCard = ({ id, name, prefs }) => (
        <Box
            onClick={() => navigate(`/board/${id}`)}
            sx={{
                height: 120,
                width: 200,
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                boxShadow: 1,
                position: "relative",
                overflow: "hidden",
                backgroundSize: "cover",
                backgroundImage: prefs?.backgroundImage
                    ? `url(${prefs.backgroundImage})`
                    : undefined,
                backgroundColor: prefs?.backgroundColor || "#0079bf",
            }}
        >
            <Typography
                sx={{
                    color: "#fff",
                    fontWeight: 600,
                    position: "relative",
                    zIndex: 1,
                    textShadow: prefs?.backgroundImage
                        ? "0 1px 3px rgba(0,0,0,0.8)"
                        : "none",
                }}
            >
                {name}
            </Typography>
        </Box>
    );

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
                    : boards.map((board) => (
                          <BoardCard key={board.id} {...board} />
                      ))}
            </Box>
        </Box>
    );
};

export default BoardList;
