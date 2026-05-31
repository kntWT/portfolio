import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { pages } from "@/configs/page";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { GitHubLink, LinkedInLink } from "./ExternalLink";

import { HeaderProp } from "@/@types/header";

const HeaderWithHamburger = (props: HeaderProp) => {
  const navigate = useNavigate();
  const handleClick = (value: number) => {
    navigate(pages[value].path);
    props.setValue(value);
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpne = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <IconButton onClick={handleOpne} sx={{ color: "text.primary" }}>
          <MenuIcon />
        </IconButton>
        <Typography
          onClick={() => handleClick(0)}
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "0.8px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Kento Watanabe
        </Typography>
        {/* <LoginButton /> */}
      </Toolbar>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 250,
            padding: 2,
            backgroundColor: "background.default",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <List sx={{ p: 0 }}>
          {pages.map((page, i) => (
            <ListItem key={page.title} sx={{ px: 0, py: 0.5 }}>
              <ListItemButton
                selected={props.value === i}
                onClick={() => handleClick(i)}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    color: "secondary.main",
                    "& .MuiListItemIcon-root": {
                      color: "secondary.main",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.12)",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color:
                      props.value === i ? "secondary.main" : "text.secondary",
                  }}
                >
                  {<page.icon />}
                </ListItemIcon>
                <ListItemText
                  primary={page.title}
                  primaryTypographyProps={{
                    fontWeight: props.value === i ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            mt: "auto",
            pb: 2,
          }}
        >
          <Box flexGrow={1} />
          <LinkedInLink color="text.secondary" />
          <Box flexGrow={1} />
          <GitHubLink color="text.secondary" />
          <Box flexGrow={1} />
        </Box>
      </Drawer>
    </>
  );
};
export default HeaderWithHamburger;
