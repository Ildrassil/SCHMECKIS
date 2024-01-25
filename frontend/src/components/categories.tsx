import React, {useState} from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";


export default function categorieMenu(categoriesList: string[]) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List
                component="nav"
                aria-label="CATEGORIES"
                sx={{bgcolor: "transparent"}}
            >
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="REGULAR"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary="CATEGORIES"
                        secondary={categoriesList[selectedIndex]}
                    />
                </ListItemButton>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                }}
            >
                {categoriesList.map((categorie, index) => (
                    <MenuItem
                        key={categorie}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {categorie}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
