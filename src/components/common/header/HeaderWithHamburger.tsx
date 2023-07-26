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

import { pages } from "../../../configs/pageConfig";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import LoginButton from "./LoginButton";
import { TwitterLink, GitHubLink } from "./ExternalLink";

import { HeaderProp } from "../../../@types/header";

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
        <Toolbar sx={{justifyContent: "space-between"}}>
            <IconButton
                onClick={handleOpne}
                sx={{float: "left"}}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                onClick={() => handleClick(0)}
            >
                Kento Watanabe
            </Typography>
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
                    <ListItem key={page.title} sx={{px: 0}}>
                        <ListItemButton
                            selected={props.value === i}
                            onClick={() => handleClick(i)}
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