import { Article, Service, FetchedWork, DB } from "@/@types/article";

// const loadDB = async (): Promise<DB> => {
//     return await import("../../db.json") as DB;
// }

const loadWorks = async (): Promise<Article[]> => {
    const param = import.meta.env.VITE_FETCH_WORKS_PARAMS.replace(/#/g, "$");
    const url = `${import.meta.env.VITE_FETCH_WORKS_URL}?${param}`

    const data = await fetch(url, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // "Access-Control-Allow-Origin": "*",
        },
        mode: 'cors',
    })
        .then((res) => res.json())
        .then((data) => data as FetchedWork[])
        .catch((err) => console.error(err))
    if (!data) return [];

    return data.map((d: FetchedWork) => {
        const year = d.publication.publishedDate.match(/\d{4}/)?.[0] ?? "";
        const externalUrl = Object.entries(d.embed).map(([key, value]) => ({
            type: key === "youtube" ? "video" : "blog",
            url: value,
            text: key,
        }));
        const tags = [year, ...d.core.keywords,]
        return {
            id: parseInt(d.core.id),
            title: d.core.title,
            year: year,
            links: [...externalUrl, { type: "url", url: `https://dl.nkmr-lab.org/papers/${d.core.id}`, text: "論文リポジトリ" }],
            description: d.core.abstract,
            image: d.core.thumbnail,
            tags: tags,
            cite: `${d.core.authors.join(", ")}.${d.core.title},${d.publication.bookTitle}, ${d.publication.volume}, ${d.publication.number}, oo.${d.publication.page}, ${d.publication.volume}, ${year}.`,
        } as Article;
    });
}
// const loadWorks = async (): Promise<Work[]> => {
//     return (await loadDB()).works;
// }

const workService: Service = {

    contents: await loadWorks(),

    getNextId: () => {
        return workService.contents.reduce((max, work) => Math.max(max, work?.id ?? 0), 0) + 1;
    },

    reload: async () => {
        workService.contents = await loadWorks();
    },

    getArticles: async (): Promise<Article[]> => {
        return new Promise((resolve, reject) => {
            resolve(workService.contents);
        });
    },

    getArticleById: async (id: number): Promise<Article | null> => {
        return new Promise((resolve, reject) => {
            resolve(workService.contents.find((work) => work.id === id) ?? null);
        });
    },

    getArticlesByTag: async (tag: string): Promise<Article[]> => {
        return new Promise((resolve, reject) => {
            resolve(workService.contents.filter((work) => work.tags.includes(tag)));
        });
    },
}

const works: Article[] = await workService.getArticles();

export {
    workService,
    works,
}