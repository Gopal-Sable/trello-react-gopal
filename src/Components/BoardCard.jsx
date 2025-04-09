import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const CARD_WIDTH = 200;
const CARD_HEIGHT = 120;

const BoardCard = ({ board }) => {
    const navigate = useNavigate();
    const { id, name, prefs } = board;

    return (
        <Box
            onClick={() => navigate(`/board/${id}`)}
            sx={{
                height: CARD_HEIGHT,
                width: CARD_WIDTH,
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
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}
            >
                {name}
            </Typography>
        </Box>
    );
};

export default React.memo(BoardCard);
