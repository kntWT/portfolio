import { career, hobbies, profile, skills } from "@/configs/home";
import {
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
  const contentStyle = {
    padding: 4,
    margin: "auto",
    width: "90%",
    maxWidth: "1800px",
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "2400px", margin: "auto" }}>
      <Grid container sx={{ padding: 4 }}>
        <Grid item xs={12} sm={4}>
          <img
            src="/images/profile.JPG"
            style={{
              margin: "20px auto",
              width: "100%",
              maxWidth: "700px",
              objectFit: "contain",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ padding: 3 }}>
            <Typography variant="h4">Profile</Typography>
            <Divider />
            <Box sx={{ padding: 1 }}>
              <Typography variant="subtitle1">About</Typography>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", padding: 1 }}
              >
                {profile}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                Hobby
              </Typography>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", padding: 1 }}
              >
                {hobbies.join(", ")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={contentStyle}>
        <Typography variant="h4">Career</Typography>
        <Divider />
        <Table>
          <TableBody>
            {career.map((c, i) => (
              <TableRow key={i}>
                <TableCell>{c.year}</TableCell>
                <TableCell>{c.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={contentStyle}>
        <Typography variant="h4">Skills</Typography>
        <Divider />
        <ImageList cols={10}>
          {skills.map((skill, i) => (
            <ImageListItem key={i}>
              <img
                src={`https://skillicons.dev/icons?i=${skill}`}
                alt={skill}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Home;
