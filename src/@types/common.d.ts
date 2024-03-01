import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgMuiIconMap } from '@mui/material'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

type MuiIcon = OverridableComponent<SvgMuiIconMap<{}, "svg">> & {
    muiName: string;
};
type CallableComponent = () => EmotionJSX.Element;

type Article = {
    id?: number;
    title: string;
    date: string;
    url: string;
    description: string;
    image: string;
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
    Article,
    Service,
    DB,
}