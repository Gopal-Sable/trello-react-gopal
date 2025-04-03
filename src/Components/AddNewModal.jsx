import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Stack, IconButton, Divider } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: '90%', sm: 400 },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    outline: 'none'
};

export default function AddNewModal({ children, handleSubmit, name }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        setInputValue("");
        setError(null);
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setOpen(false);
        }
    };

    const onSubmit = async () => {
        if (!inputValue.trim()) {
            setError("Name cannot be empty");
            return;
        }

        setIsSubmitting(true);
        try {
            await handleSubmit(inputValue);
            setOpen(false);
        } catch (err) {
            setError("Failed to create. Please try again.");
            console.error("Submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
                {children}
            </Box>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" component="h2" fontWeight={600}>
                            {name}
                        </Typography>
                        <IconButton 
                            onClick={handleClose}
                            disabled={isSubmitting}
                            sx={{ color: 'text.secondary' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    
                    <Divider sx={{ mb: 3 }} />
                    
                    <TextField
                        fullWidth
                        autoFocus
                        label="Name"
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (error) setError(null);
                        }}
                        error={!!error}
                        helperText={error}
                        disabled={isSubmitting}
                        sx={{ mb: 3 }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit();
                            }
                        }}
                    />
                    
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button 
                            onClick={handleClose}
                            disabled={isSubmitting}
                            sx={{ color: 'text.secondary' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onSubmit}
                            disabled={isSubmitting || !inputValue.trim()}
                        >
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}