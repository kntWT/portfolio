import { career, hobbies, profile, skills, skillNameMap } from "@/configs/home";
import { SKILL_ICONS_URL } from "@/configs/url";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
  const sectionStyle = {
    py: 6,
    px: { xs: 2, md: 4 },
    margin: "auto",
    width: "100%",
    maxWidth: "1200px",
  };

  return (
    <Box
      sx={{ backgroundColor: "background.default", minHeight: "100vh", pb: 8 }}
    >
      {/* Profile Section */}
      <Box sx={sectionStyle}>
        <Grid container spacing={6} alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component="img"
              src="/images/profile.JPG"
              alt="Profile"
              sx={{
                width: "100%",
                maxWidth: 320,
                aspectRatio: "1/1",
                borderRadius: "32px",
                objectFit: "cover",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                border: "4px solid #ffffff",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  letterSpacing: "-0.5px",
                  color: "text.primary",
                  display: "inline-block",
                  borderBottom: "4px solid",
                  borderColor: "secondary.main",
                  pb: 1,
                  mb: 4,
                }}
              >
                Profile
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >
                About Me
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {profile}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >
                Hobby
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                }}
              >
                {hobbies.join(" / ")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Career Section */}
      <Box sx={sectionStyle}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.75rem" },
            letterSpacing: "-0.5px",
            color: "text.primary",
            display: "inline-block",
            borderBottom: "4px solid",
            borderColor: "secondary.main",
            pb: 1,
            mb: 4,
          }}
        >
          Career
        </Typography>

        <Table
          sx={{
            minWidth: { xs: "100%", sm: 650 },
            "& .MuiTableCell-root": {
              borderBottom: "1px solid #eaeaea",
              py: 2.5,
            },
          }}
        >
          <TableBody>
            {career.map((c, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    width: "20%",
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: "1.1rem",
                    pl: 0,
                  }}
                >
                  {c.year}
                </TableCell>
                <TableCell sx={{ color: "text.primary", fontWeight: 500 }}>
                  {c.content}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Skills Section */}
      <Box sx={sectionStyle}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.75rem" },
            letterSpacing: "-0.5px",
            color: "text.primary",
            display: "inline-block",
            borderBottom: "4px solid",
            borderColor: "secondary.main",
            pb: 1,
            mb: 4,
          }}
        >
          Skills
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          {skills.map((skill, i) => (
            <Tooltip title={skillNameMap[skill] ?? skill} key={i} arrow disableInteractive placement="top">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  width: { xs: 70, sm: 80 },
                  height: { xs: 70, sm: 80 },
                  borderRadius: "20px",
                  backgroundColor: "#f5f5f7",
                  border: "1px solid #eaeaea",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.01)",
                  "& img": {
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
                  },
                }}
              >
                <img src={`${SKILL_ICONS_URL}?i=${skill}`} alt={skill} />
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
