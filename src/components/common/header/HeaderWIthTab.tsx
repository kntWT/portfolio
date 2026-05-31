import { pages } from "@/configs/page";
import { Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { GitHubLink, LinkedInLink } from "./ExternalLink";

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
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            onClick={(e) => handleChange(e, 0)}
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              letterSpacing: "0.8px",
              cursor: "pointer",
              mr: 2,
              userSelect: "none",
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            Kento Watanabe
          </Typography>
          <LinkedInLink {...{ color: "action.active", ml: 0.5 }} />
          <GitHubLink {...{ color: "action.active" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tabs
            value={props.value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                color: "text.secondary",
                minHeight: "64px",
                transition: "color 0.2s",
                "&:hover": {
                  color: "secondary.main",
                },
                "&.Mui-selected": {
                  color: "secondary.main",
                },
              },
            }}
          >
            {pages.map((page, i) => (
              <Tab
                key={page.title}
                icon={<page.icon sx={{ fontSize: "1.2rem" }} />}
                iconPosition="start"
                label={page.title}
                value={i}
                sx={{ mr: 1 }}
              />
            ))}
          </Tabs>
          {/* <Box sx={{ ml: 2 }}>
            <LoginButton />
          </Box> */}
        </Box>
      </Toolbar>
    </>
  );
};
export default HeaderWithTab;
