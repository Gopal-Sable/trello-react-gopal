import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const BoardCard = ({ id, name, prefs }) => {
    const navigate = useNavigate();
    return (
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
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}
            >
                {name}
            </Typography>
        </Box>
    );
};

export default BoardCard;
