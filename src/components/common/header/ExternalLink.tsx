import { IconButton } from "@mui/material";

import { ExternalLinkProp, ExternalLinkSx } from "@/@types/header";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const openLink = (url: string) => {
  window.open(url, "_blank");
};

const ExternalLink = (props: ExternalLinkProp) => {
  return (
    <>
      <IconButton onClick={(e) => openLink(props.url)} sx={{ ...props.sx }}>
        <props.icon />
      </IconButton>
    </>
  );
};

const LinkedInLink = (sx?: ExternalLinkSx) => {
  const icon = LinkedInIcon;
  const url = import.meta.env.VITE_LINKEDIN_URL;
  const props: ExternalLinkProp = {
    icon: icon,
    url: url,
    sx: sx,
  };
  return <ExternalLink {...props} />;
};

const GitHubLink = (sx?: ExternalLinkSx) => {
  const icon = GitHubIcon;
  const url = import.meta.env.VITE_GITHUB_URL;
  const props: ExternalLinkProp = {
    icon: icon,
    url: url,
    sx: sx,
  };
  return <ExternalLink {...props} />;
};

export { GitHubLink, LinkedInLink };
