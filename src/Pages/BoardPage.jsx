import { Box } from "@mui/material";
import React from "react";
import List from "../Components/List";
const BoardPage = () => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
                gap: 2,
            }}
        >
            <List />
        </Box>
    );
};

export default BoardPage;
