import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
} from "@mui/material";

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
                <Box>
                    {pages.map(page => (
                        <Button
                            key={page.title}
                            onClick={() => navigage(page.path)}
                            style={{ margin: 4, color: "white", display: "inline"}}
                        >
                            <Typography style={{ color: "black" }}>{page.title}</Typography>
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </ AppBar>
    );
}

export default Header;