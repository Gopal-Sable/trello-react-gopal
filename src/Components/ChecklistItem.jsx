import { ListItem, Checkbox, ListItemText, Button } from "@mui/material";

export const ChecklistItem = ({ item, onToggle, onDelete }) => (
    <ListItem sx={{ p: 0, "&:hover": { backgroundColor: "action.hover" } }}>
        <Checkbox
            checked={item.state === "complete"}
            onChange={onToggle}
            sx={{ mr: 1 }}
        />
        <ListItemText
            primary={item.name}
            sx={{
                textDecoration:
                    item.state === "complete" ? "line-through" : "none",
                color:
                    item.state === "complete"
                        ? "text.secondary"
                        : "text.primary",
            }}
        />
        <Button size="small" color="error" onClick={onDelete}>
            Delete
        </Button>
    </ListItem>
);
