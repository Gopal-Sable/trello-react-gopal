import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Board from "./Board";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import AddNewBoardModal from "./AddNewModal";

const BoardList = () => {
    const navigate = useNavigate();
    const [boardsData, setBoardsData] = useState([]);
    const handleSubmit = async (name) => {
        const data = await axios.post(
            `${BASE_URL}1/boards/?name=${name}&key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}`
        );
        setBoardsData([ ...boardsData, data.data ]);
    };
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(
                `${BASE_URL}1/members/me/boards?key=${
                    import.meta.env.VITE_API_KEY
                }&token=${import.meta.env.VITE_TOKEN}`
            );
            setBoardsData(data.data);
        }
        fetchData();
    }, []);
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
            <AddNewBoardModal name="Add new Board" handleSubmit={handleSubmit}>
                <Board
                    title={"+ Add new Board"}
                    children={<></>}
                    handleClick={() => {}}
                />
            </AddNewBoardModal>

            {boardsData.map(({ id, name }) => {
                return (
                    <Board
                        title={name}
                        key={id}
                        children={null}
                        handleClick={() => navigate(`/board/${id}`)}
                    />
                );
            })}
        </Box>
    );
};

export default BoardList;
