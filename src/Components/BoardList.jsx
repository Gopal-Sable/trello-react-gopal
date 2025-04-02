import { Box } from "@mui/material";
import React from "react";
import Board from "./Board";

const BoardList = () => {
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
            <Board title={"+ Add new Board"} children={<></>} handleClick={()=>{}} />
            <Board title={"ABCD"} children={null} handleClick={()=>{}}/>
            <Board title={"XYZ"} children={null} handleClick={()=>{}}/>
            <Board title={"OPQ"} children={null} handleClick={()=>{}}/>
        </Box>
    );
};

export default BoardList;
