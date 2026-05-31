import { AppBar, Box } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderWithTab from "./HeaderWIthTab";
import HeaderWithHamburger from "./HeaderWithHamburger";

import { HeaderProp } from "@/@types/header";
import { pages } from "@/configs/page";

const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState<number>(
    pages.findIndex((page) => page.path === location.pathname),
  );
  const props: HeaderProp = { value: value, setValue: setValue };

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Box sx={{ display: { sm: "block", xs: "none" } }}>
        <HeaderWithTab {...props} />
      </Box>
      <Box sx={{ display: { sm: "none", xs: "block" } }}>
        <HeaderWithHamburger {...props} />
      </Box>
    </AppBar>
  );
};

export default Header;
