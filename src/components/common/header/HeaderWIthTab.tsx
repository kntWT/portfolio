import { useNavigate } from "react-router-dom";
import {
    Toolbar,
    Typography,
    Box,
    Tabs,
    Tab,
} from "@mui/material";
import { pages } from "../../../configs/page";

import LoginButton from "./LoginButton";
import { TwitterLink, GitHubLink } from "./ExternalLink";

import { HeaderProp } from "../../../@types/header";

const HeaderWithTab = (props: HeaderProp) => {
    
    const navigate = useNavigate();
    const handleChange = (e: React.SyntheticEvent<Element, Event>, newValue: number) => {
        navigate(pages[newValue].path);
        props.setValue(newValue);
    }

    return <>
        <Toolbar>
            <Typography onClick={(e) => handleChange(e, 0)} >Kento Watanabe</Typography>
            <TwitterLink {...{color: "white", ml: 1}} />
            <GitHubLink {...{color: "white"}} />
            <Box sx={{flexGrow: 1}} />
            <Box>
                <Tabs
                    value={props.value}
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
                            key={page.title}
                            icon={<page.icon />}
                            iconPosition="start"
                            label={page.title}
                            value={i}
                            sx={{ mr: 1, color: "white" }}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box> <LoginButton /> </Box>
        </Toolbar>
    </>
}
export default HeaderWithTab;