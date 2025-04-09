import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewModal from "../AddNewModal";

const CreateListButton = ({ handleCreateList }) => {
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
