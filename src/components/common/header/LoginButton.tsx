import { useState, MouseEvent } from "react";
import {
    Box,
    IconButton,
    Popover,
    TextField,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { useLoginStore } from "@/store/Login";

const LoginButton = () => {
    const PASSWORD = import.meta.env.VITE_PASSWORD;
    const { isLoggedIn, login, logout } = useLoginStore();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isOpen = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
        setTimeout(() => document.getElementById("textfield")?.focus(), 100);
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
            setTimeout(() => handleClose(), 100);
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
export default LoginButton;