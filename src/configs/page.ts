import Home from '../pages/Home';
import Products from '../pages/Products';
import Works from '../pages/Works';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';

import { MuiIcon, CallableComponent } from '@/@types/common';

const pageNames = [
    "Home",
    "Products",
    "Works",
] as const;

type PageName = typeof pageNames[number];

type Page = Readonly<{
    title: PageName;
    path: string;
    icon: MuiIcon;
    component: CallableComponent;
}>;

const toPath = (pageName: PageName): string => {
    return pageName === "Home" ? "/" : `/${pageName.toLowerCase()}`;
};
const getIcon = (pageName: PageName): MuiIcon => {
    switch (pageName) {
        case "Home":
            return HomeIcon;
        case "Products":
            return CodeIcon;
        case "Works":
            return ArticleIcon;
    }
};
const getComponent = (pageName: PageName): CallableComponent => {
    switch (pageName) {
        case "Home":
            return Home;
        case "Products":
            return Products;
        case "Works":
            return Works;
    }
};

const pages: Page[] = pageNames.map(pageName => ({
    title: pageName,
    path: toPath(pageName),
    icon: getIcon(pageName),
    component: getComponent(pageName),
} as const));

export {
    pages,
    type PageName,
}