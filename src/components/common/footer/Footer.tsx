import { 
    Container,
    Typography
} from "@mui/material"

const Footer = () => {
    const now = new Date();
    return <>
        <Container sx={{position: "sticky", textAlign: "center", my: 2}}>
            <Typography>©️2022 - {now.getFullYear()} Kento Watanabe</Typography>
        </Container>
    </>
}

export default Footer;