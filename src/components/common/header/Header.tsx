import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    AppBar,
    Box,
} from "@mui/material";
import HeaderWithTab from "./HeaderWIthTab";
import HeaderWithHamburger from "./HeaderWithHamburger";

import { pages } from "../../../configs/page";
import { HeaderProp } from "../../../@types/header";

const Header = () => {
    const location = useLocation();
    const [value, setValue] = useState<number>(pages.findIndex(page => page.path === location.pathname));
    const props: HeaderProp = {value: value, setValue: setValue};

    return (
        <AppBar position="static">
                <Box sx={{display: {sm: "block",xs: "none"}}}>
                    <HeaderWithTab {...props} />
                </Box>
                <Box sx={{display: {sm: "none",xs: "block"}}}>
                    <HeaderWithHamburger {...props} />
                </Box>
        </ AppBar>
    );
}

export default Header;