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

type FetchedWork = {
    core: {
        id: string;
        type: string;
        title: string;
        abstract: string;
        authors: string[];
        keywords: string[];
        language: "ja" | "en";
        presentationDate: string;
        presentationLocation: string;
        sortingDate: string;
        thumbnail: string;
        thumbnailSmall: string;
        externalUrl: string;
    };
    embed: {
        youtube?: string;
        slideshare?: string;
        speakerdeck?: string;
        docswell?: string;
    };
    files: {
        word?: string;
        paper?: string;
        pptx?: string;
    }
    publication: {
        bookTitle: string;
        number: string;
        page: string;
        publicationDate: string;
        volume: string;
    };
}

type DB = {
    products: Article[];
    works: Article[];
}

export {
    LinkType,
    Article,
    Service,
    FetchedWork,
    DB,
}