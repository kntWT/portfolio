import { Article, FetchedWork, Service } from "@/@types/article";
import { PAPER_REPOSITORY_PAPERS_URL } from "./url";

// const loadDB = async (): Promise<DB> => {
//     return await import("../../db.json") as DB;
// }

const loadWorks = async (): Promise<Article[]> => {
  const paramJa = import.meta.env.VITE_FETCH_WORKS_PARAMS_JA.replace(/#/g, "$");
  const paramEn = import.meta.env.VITE_FETCH_WORKS_PARAMS_EN.replace(/#/g, "$");
  const urlJa = `${import.meta.env.VITE_FETCH_WORKS_URL}?${paramJa}`;
  const urlEn = `${import.meta.env.VITE_FETCH_WORKS_URL}?${paramEn}`;

  const [dataJa, dataEn] = await Promise.all([
    fetch(urlJa, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => data as FetchedWork[])
      .catch((err) => {
        console.error(err);
        return [];
      }),
    fetch(urlEn, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => data as FetchedWork[])
      .catch((err) => {
        console.error(err);
        return [];
      }),
  ]);

  const articlesJa = dataJa.map((d: FetchedWork) => {
    return parseArticle(d);
  });
  const articlesEn = dataEn.map((d: FetchedWork) => {
    return parseArticle(d);
  });
  return [...articlesJa, ...articlesEn].sort((a, b) => {
    return a.date!.getTime() - b.date!.getTime();
  });
};

const parseArticle = (d: FetchedWork) => {
  const date = new Date(d.publication.publishedDate);
  const year = date.getFullYear();
  const externalUrl = Object.entries(d.embed).map(([key, value]) => ({
    type: key === "youtube" ? "video" : "blog",
    url: value,
    text: key,
  }));
  const tags = [year, ...d.core.keywords];
  return {
    id: parseInt(d.core.id)!,
    title: d.core.title,
    year: year.toString(),
    date: date,
    links: [
      ...externalUrl,
      {
        type: "url",
        url: `${PAPER_REPOSITORY_PAPERS_URL}/${d.core.id}`,
        text: "論文リポジトリ",
      },
    ],
    description: d.core.abstract,
    image: d.core.thumbnail ?? "noimage.png",
    tags: tags,
    cite: `${d.core.authors.join(", ")}.${d.core.title},${d.publication.bookTitle}, ${d.publication.volume}, ${d.publication.number}, oo.${d.publication.page}, ${d.publication.volume}, ${year}.`,
  } as Article;
};
// const loadWorks = async (): Promise<Work[]> => {
//     return (await loadDB()).works;
// }

const workService: Service = {
  contents: [],

  getNextId: () => {
    return (
      workService.contents.reduce(
        (max, work) => Math.max(max, work?.id ?? 0),
        0,
      ) + 1
    );
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
};

export { workService };
