import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  const now = new Date();
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #eaeaea",
        py: 4,
        mt: 8,
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ letterSpacing: "0.5px" }}
        >
          ©️2022 - {now.getFullYear()} Kento Watanabe
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
