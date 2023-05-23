import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Tabs,
    Tab,
} from "@mui/material";
import LoginButton from "./header/LoginButton";

const Header = () => {
    const navigage = useNavigate();
    const pages = [
        "Home",
        "About",
        "Research",
        "Works",
    ] as const;
    type PageName = typeof pages[number];
    const getPath = (page: PageName): string => {
        return page === "Home" ? "/" : `/${page.toLowerCase()}`;
    }

    const location = useLocation();
    const [value, setValue] = useState<number>(pages.findIndex(page => getPath(page) === location.pathname));
    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigage(getPath(pages[newValue]));
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography >Kento Watanabe</Typography>
                <Box sx={{flexGrow: 1}} />
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "white",
                                height: "3px",
                            }}
                        }
                    >
                        {pages.map((page, i) => (
                            <Tab
                                key={page}
                                label={page}
                                value={i}
                                sx={{ mr: 1, color: "white", display: "inline" }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box> <LoginButton /> </Box>
            </Toolbar>
        </ AppBar>
    );
}

export default Header;