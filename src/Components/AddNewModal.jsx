import { useState } from "react";
import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    Stack,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
};

const AddNewModal = ({ children, name, handleSubmit }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmitForm = async () => {
        if (!input.trim()) {
            setError("Name cannot be empty");
            return;
        }
        setLoading(true);
        try {
            await handleSubmit(input);
            setOpen(false);
            setInput("");
        } catch (err) {
            setError("Failed to create");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
                {children}
            </Box>

            <Modal open={open} onClose={() => !loading && setOpen(false)}>
                <Box sx={modalStyle}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography variant="h6">{name}</Typography>
                        <IconButton onClick={() => !loading && setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <TextField
                        fullWidth
                        autoFocus
                        label="Name"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError("");
                        }}
                        error={!!error}
                        helperText={error}
                        disabled={loading}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSubmitForm()
                        }
                    />

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        mt={3}
                    >
                        <Button
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmitForm}
                            disabled={!input.trim() || loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default AddNewModal;
