import Home from '../pages/Home';
import About from '../pages/About';
import Research from '../pages/Research';
import Works from '../pages/Works';

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';

const pageNames = [
    "Home",
    "About",
    "Research",
    "Works",
] as const;
type PageName = typeof pageNames[number];
type Page = {
    readonly title: PageName;
    path: string;
    icon: any;
    component: any;
}

const toPath = (pageName: PageName): string => {
    return pageName === "Home" ? "/" : `/${pageName.toLowerCase()}`;
}
const getIcon = (pageName: PageName) => {
    switch (pageName) {
        case "Home":
            return HomeIcon;
        case "About":
            return AccountCircleIcon;
        case "Research":
            return ArticleIcon;
        case "Works":
            return CodeIcon;
    }
}
const getComponent = (pageName: PageName) => {
    switch (pageName) {
        case "Home":
            return Home;
        case "About":
            return About;
        case "Research":
            return Research;
        case "Works":
            return Works;
    }
}

const pages: Page[] = pageNames.map(pageName => ({
    title: pageName,
    path: toPath(pageName),
    icon: getIcon(pageName),
    component: getComponent(pageName),
} as const));

export default pages;