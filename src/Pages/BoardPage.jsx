import { Box, Typography } from "@mui/material";
import List from "../Components/List";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import AddNewModal from "../Components/AddNewModal";

const BoardPage = () => {
    const { id } = useParams();
    const [listData, setListData] = useState([]);
    const handleSubmit = async (name) => {
        const data = await axios.post(
            `${BASE_URL}1/boards/${id}/lists?name=${name}&key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}`
        );
        setListData([...listData, data.data]);
    };
    // const handleArchive=async (id)=>{
    //     const data = await axios.post(
    //         `${BASE_URL}1/boards/${id}/lists?name=${name}&key=${
    //             import.meta.env.VITE_API_KEY
    //         }&token=${import.meta.env.VITE_TOKEN}`
    //     );
    //     setListData([...listData, data.data]);
    // }
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(
                `${BASE_URL}1/boards/${id}/lists?key=${
                    import.meta.env.VITE_API_KEY
                }&token=${import.meta.env.VITE_TOKEN}`
            );
            setListData(data.data);
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
            <AddNewModal name="Add New List" handleSubmit={handleSubmit}>
                <List listName="+ Add New List" />
            </AddNewModal>
            {listData.map(({ name, id }) => {
                return (
                    <div key={id}>
                        {console.log(id)}
                        <button onClick={() => handleArchive(id)}>
                            Archive
                        </button>
                        <List listName={name} id={id} />;
                    </div>
                );
            })}
        </Box>
    );
};

export default BoardPage;
