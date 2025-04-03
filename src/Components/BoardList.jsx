import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import AddNewBoardModal from "./AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

const BoardList = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [boardsData, setBoardsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (name) => {
        const data = await axios.post(
            `${BASE_URL}1/boards/?name=${name}&key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}`
        );
        setBoardsData([...boardsData, data.data]);
    };

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const data = await axios.get(
                    `${BASE_URL}1/members/me/boards?key=${
                        import.meta.env.VITE_API_KEY
                    }&token=${import.meta.env.VITE_TOKEN}`
                );
                setBoardsData(data.data);
            } catch (error) {
                console.error("Error fetching boards:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                p: 4,
                minHeight: "100vh",
                bgcolor: grey[100],
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                }}
            >
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
                    handleSubmit={handleSubmit}
                >
                    <Box
                        sx={{
                            height: 120,
                            width: 250,
                            borderRadius: 2,
                            bgcolor: grey[200],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                                bgcolor: grey[300],
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: theme.palette.text.secondary,
                            }}
                        >
                            <AddIcon sx={{ mr: 1 }} />
                            <Typography>Create new board</Typography>
                        </Box>
                    </Box>
                </AddNewBoardModal>

                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <Skeleton
                              key={index}
                              variant="rounded"
                              width={250}
                              height={120}
                              sx={{ borderRadius: 2 }}
                          />
                      ))
                    : boardsData.map(({ id, name, prefs }) => (
                          <Box
                              key={id}
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
                                  backgroundImage: prefs?.backgroundImage
                                      ? `url(${prefs.backgroundImage})`
                                      : undefined,
                                  backgroundColor:
                                      prefs?.backgroundColor || "#0079bf",
                                  backgroundSize: "cover",
                                 
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
                      ))}
            </Box>
        </Box>
    );
};

export default BoardList;
