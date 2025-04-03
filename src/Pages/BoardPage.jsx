import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import ListComponent from "../Components/List";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import AddNewModal from "../Components/AddNewModal";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import { grey } from "@mui/material/colors";

const BoardPage = () => {
    const { id } = useParams();
    const theme = useTheme();
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            try {
                const data = await axios.get(
                    `${BASE_URL}1/boards/${id}/lists?key=${
                        import.meta.env.VITE_API_KEY
                    }&token=${import.meta.env.VITE_TOKEN}`
                );
                setListData(data.data);
            } catch (error) {
                console.error("Error fetching lists:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                p: 2,
                gap: 2,
                overflowX: "auto",
                minHeight: "calc(100vh - 64px)",
            }}
        >
            <Box sx={{ minWidth: 272, flexShrink: 0 }}>
                <AddNewModal name="Add New List" handleSubmit={handleSubmit}>
                    <Button
                        fullWidth
                        startIcon={<AddIcon />}
                        sx={{
                            height: 40,
                            justifyContent: "flex-start",
                            borderRadius: 1,
                            px: 2,
                            color: grey[600],

                            bgcolor: "#ebecf0",
                        }}
                    >
                        Add another list
                    </Button>
                </AddNewModal>
            </Box>

            {/* Loading State */}
            {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 272,
                            height: "100%",
                            bgcolor: grey[600],
                            borderRadius: 1,
                            p: 1,
                        }}
                    />
                ))}

            {/* Lists */}
            {!loading &&
                listData.map(({ name, id }) => (
                    <Box
                        key={id}
                        sx={{
                            position: "relative",
                            minWidth: 272,
                            flexShrink: 0,
                        }}
                    >
                        <IconButton
                            onClick={() => handleArchive(id)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                zIndex: 1,
                                color: grey[600],
                                "&:hover": {
                                    color: "error.main",
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                },
                            }}
                        >
                            <ArchiveIcon fontSize="small" />
                        </IconButton>
                        <ListComponent listName={name} id={id} />
                    </Box>
                ))}
        </Box>
    );
};

export default BoardPage;
