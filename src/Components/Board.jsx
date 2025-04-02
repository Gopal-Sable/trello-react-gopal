import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";


const Board = ({ title, children, handleClick }) => {
    return (
        <Card>
            <CardActionArea
                onClick={handleClick}
                sx={{
                    height: "100%",
                    "&[data-active]": {
                        backgroundColor: "action.selected",
                        "&:hover": {
                            backgroundColor: "action.selectedHover",
                        },
                    },
                }}
            >
                <CardContent sx={{ height: "100%" }}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    {children}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Board;
