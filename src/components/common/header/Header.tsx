import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    AppBar,
    Box,
} from "@mui/material";
import HeaderWithTab from "./HeaderWIthTab";
import HeaderWithHamburger from "./HeaderWithHamburger";

import pages from "../../../configs/pageConfig";

const Header = () => {
    const location = useLocation();
    const [value, setValue] = useState<number>(pages.findIndex(page => page.path === location.pathname));

    return (
        <AppBar position="static">
                <Box sx={{display: {sm: "block",xs: "none"}}}>
                    <HeaderWithTab value={value} setValue={setValue} />
                </Box>
                <Box sx={{display: {sm: "none",xs: "block"}}}>
                    <HeaderWithHamburger value={value} setValue={setValue} />
                </Box>
        </ AppBar>
    );
}

export default Header;