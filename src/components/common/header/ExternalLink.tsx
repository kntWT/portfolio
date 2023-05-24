import {
    IconButton
} from "@mui/material"

import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const openLink = (url: string) => {
    window.open(url, "_blank")
}

const TwitterLink = () => {
    const url = import.meta.env.VITE_TWITTER_URL;
    return <>
        <IconButton onClick={(e) => openLink(url)}>
            <TwitterIcon />
        </IconButton>
    </>
}

const GitHubLink = () => {
    const url = import.meta.env.VITE_GITHUB_URL;
    return <>
        <IconButton onClick={(e) => openLink(url)}>
            <GitHubIcon />
        </IconButton>
    </>
}

export {
    TwitterLink,
    GitHubLink,
}