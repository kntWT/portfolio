import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Popover,
    TextField,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { useLoginStore } from "../../store/Login";
function LoginButton(): JSX.Element {
    const PASSWORD = import.meta.env.VITE_PASSWORD;
    const isLoggedIn = useLoginStore(state => state.isLoggedIn);
    const login = useLoginStore(state => state.login);
    const logout = useLoginStore(state => state.logout);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isOpen = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [password, setPassword] = useState<string>("");
    const onChange = (value: string) => {
        setPassword(value);
    };
    const onEntered = () => {
        if (password === PASSWORD) {
            login();
            setPassword("");
        }
    };

    const passwordField: JSX.Element = 
    <Box className="ma-4">
        <TextField
            id="textfield"
            label="password"
            type="password"
            variant="standard"
            onChange={e => onChange(e.target.value)}
        />
    </Box>;

    return (
        <>
            <IconButton
                color="info"
                size="small"
                onClick={isLoggedIn ? logout : handleOpen}
            >
                { isLoggedIn ? <LockOpenIcon  /> : <LockIcon /> }
            </IconButton>
            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onEntered();
                    }
                }}
            >
                {passwordField}
            </Popover>
        </>
    );
}

const Header = () => {
    const navigage = useNavigate();
    const pages: Array<{ title: string, path: string }> = [
        {title: "Home", path: "/"},
        {title: "About", path: "/about"},
        {title: "Research", path: "/research"},
        {title: "Works", path: "/works"},
    ]

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography >Kento Watanabe</Typography>
                <Box sx={{flexGrow: 1}} />
                <Box>
                    {pages.map(page => (
                        <Button
                            key={page.title}
                            onClick={() => navigage(page.path)}
                            sx={{ mr: 1, color: "white", display: "inline"}}
                        >
                            <Typography sx={{ color: "black" }}>{page.title}</Typography>
                        </Button>
                    ))}
                </Box>
                <Box> <LoginButton /> </Box>
            </Toolbar>
        </ AppBar>
    );
}

export default Header;