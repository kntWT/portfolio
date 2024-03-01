import { Article, Service, DB } from "../@types/common";
type Work = Readonly<{}> & Article;

const loadDB = async (): Promise<DB> => {
    return await import("../../db.json");
}
const loadWorks = async (): Promise<Work[]> => {
    return (await loadDB()).works;
}

const prodctService: Service = {

    contents: await loadWorks(),

    getNextId: () => {
        return prodctService.contents.reduce((max, work) => Math.max(max, work?.id ?? 0), 0) + 1;
    },

    reload: async () => {
        prodctService.contents = await loadWorks();
    },

    getArticles: async (): Promise<Work[]> => {
        return new Promise((resolve, reject) => {
            resolve(prodctService.contents);
        });
    },

    getArticleById: async (id: number): Promise<Work | null> => {
        return new Promise((resolve, reject) => {
             resolve(prodctService.contents.find((work) => work.id === id) ?? null);
        });
    },

    getArticlesByTag: async (tag: string): Promise<Work[]> => {
        return new Promise((resolve, reject) => {
            resolve(prodctService.contents.filter((work) => work.tags.includes(tag)));
        });
    },
}

const works: Work[] = await prodctService.getArticles();

export {
    prodctService,
    works,
}