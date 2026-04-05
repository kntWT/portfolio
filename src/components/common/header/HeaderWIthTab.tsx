import { pages } from "@/configs/page";
import { Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { GitHubLink, LinkedInLink } from "./ExternalLink";
import LoginButton from "./LoginButton";

import { HeaderProp } from "@/@types/header";

const HeaderWithTab = (props: HeaderProp) => {
  const navigate = useNavigate();
  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    navigate(pages[newValue].path);
    props.setValue(newValue);
  };

  return (
    <>
      <Toolbar>
        <Typography onClick={(e) => handleChange(e, 0)}>
          Kento Watanabe
        </Typography>
        <LinkedInLink {...{ color: "white", ml: 1 }} />
        <GitHubLink {...{ color: "white" }} />
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Tabs
            value={props.value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
                height: "3px",
              },
            }}
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
        <Box>
          {" "}
          <LoginButton />{" "}
        </Box>
      </Toolbar>
    </>
  );
};
export default HeaderWithTab;
