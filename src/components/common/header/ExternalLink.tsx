import {
    IconButton
} from "@mui/material"

import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ExternalLinkProp, ExternalLinkSx } from "@/@types/header";

const openLink = (url: string) => {
    window.open(url, "_blank")
}

const ExternalLink = (props: ExternalLinkProp) => {
    return <>
        <IconButton onClick={(e) => openLink(props.url)} sx={{...props.sx}}>
            <props.icon />
        </IconButton>
    </>
}

const TwitterLink = (sx?: ExternalLinkSx) => {
    const icon = TwitterIcon;
    const url = import.meta.env.VITE_TWITTER_URL;
    const props: ExternalLinkProp = {
        icon: icon,
        url: url,
        sx: sx,
    }
    return <ExternalLink {...props} />
}

const GitHubLink = (sx?: ExternalLinkSx) => {
    const icon = GitHubIcon;
    const url = import.meta.env.VITE_GITHUB_URL;
    const props: ExternalLinkProp = {
        icon: icon,
        url: url,
        sx: sx,
    }
    return <ExternalLink {...props} />
}

export {
    TwitterLink,
    GitHubLink,
}