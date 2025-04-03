import { Box, List, ListSubheader, Typography } from "@mui/material";
import ListComponent from "../Components/List";
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
    const handleArchive = async (id) => {
        const data = await axios.put(
            `${BASE_URL}1/lists/${id}/?key=${
                import.meta.env.VITE_API_KEY
            }&token=${import.meta.env.VITE_TOKEN}&closed=true`
        );
        let newData = listData.filter((list) => list.id !== data.data.id);
        setListData(newData);
    };
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
                {/* <List listName="+ Add New List" /> */}
                <List
                    sx={{
                        height: "100%",
                        "&[data-active]": {
                            backgroundColor: "action.selected",
                            "&:hover": {
                                backgroundColor: "action.selectedHover",
                            },
                        },
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            Add New
                        </ListSubheader>
                    }
                ></List>
            </AddNewModal>
            {listData.map(({ name, id }) => {
                return (
                    <div key={id}>
                        <button onClick={() => handleArchive(id)}>
                            Archive
                        </button>
                        <ListComponent listName={name} id={id} />
                    </div>
                );
            })}
        </Box>
    );
};

export default BoardPage;
