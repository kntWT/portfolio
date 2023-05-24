import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Toolbar,
    IconButton,
    Box,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import pages from "../../../configs/pageConfig";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import LoginButton from "./LoginButton";
import { TwitterLink, GitHubLink } from "./ExternalLink";

import HeaderProp from "./props";

const HeaderWithHamburger = (props: HeaderProp) => {
    const navigate = useNavigate();
    const handleClick = (value: number) => {
        navigate(pages[value].path);
        props.setValue(value);
        handleClose();
    }

    const [open, setOpen] = useState(false);
    const handleOpne = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <Toolbar sx={{justifyContent: "center"}}>
            <IconButton
                onClick={handleOpne}
                sx={{float: "left"}}
            >
                <MenuIcon />
            </IconButton>
            <Box flexGrow={1} />
            <Typography>Kento Watanabe</Typography>
            <Box flexGrow={1} />
            <LoginButton />
        </Toolbar>

        <Drawer
            open={open}
        >
            <IconButton
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            <Divider />

            <List>
                {pages.map((page, i) => (
                    <ListItem key={page.title}>
                        <ListItemButton
                            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(i)}
                        >
                            <ListItemIcon>
                                {<page.icon />}
                            </ListItemIcon>
                            <ListItemText primary={page.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />

            <Box sx={{display: "inline-flex", justifyContent: "center" }} >
                <Box flexGrow={1} />
                <TwitterLink />
                <Box flexGrow={1} />
                <GitHubLink />
                <Box flexGrow={1} />
            </Box>
        </Drawer>
    </>
}
export default HeaderWithHamburger;