import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewModal from "../AddNewModal";
import { listAPIs } from "../../utils/apiCalls";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addList } from "../../features/listSlice";

const CreateListButton = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const handleCreateList = async (name) => {
        const { data, error } = await listAPIs.createList(id, name);
        if (error) return error;
        dispatch(addList(data));
        return null;
    };
    return (
        <AddNewModal name="Add List" handleSubmit={handleCreateList}>
            <Button
                startIcon={<AddIcon />}
                sx={{ minWidth: 272, justifyContent: "flex-start" }}
            >
                Add another list
            </Button>
        </AddNewModal>
    );
};

export default CreateListButton;
