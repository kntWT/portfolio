import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgMuiIconMap } from '@mui/material'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

type MuiIcon = OverridableComponent<SvgMuiIconMap<{}, "svg">> & {
    muiName: string;
};
type CallableComponent = () => EmotionJSX.Element;

type LinkType = "url" | "github" | "blog" | "paper";

type Article = {
    id?: number;
    title: string;
    year: string;
    links: { type: LinkType, url: string, text?: string }[];
    description: string;
    image: string;
    stacks?: string[];
    tags: string[];
};

type Service = {
    contents: Article[];
    getNextId: () => number;
    reload: () => void;
    getArticles: () => Promise<Article[]>;
    getArticleById: (id: number) => Promise<Article | null>;
    getArticlesByTag: (tag: string) => Promise<Article[]>;
}

type DB = {
    products: Article[];
    works: Article[];
}

export {
    MuiIcon,
    CallableComponent,
    LinkType,
    Article,
    Service,
    DB,
}