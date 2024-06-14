import { Article, Service, DB } from "@/@types/article";

const loadDB = async (): Promise<DB> => {
    return await import("../../db.json") as DB;
}
const loadProducts = async (): Promise<Article[]> => {
    return (await loadDB()).products;
}

const productService: Service = {

    contents: [],

    getNextId: () => {
        return productService.contents.reduce((max, product) => Math.max(max, product?.id ?? 0), 0) + 1;
    },

    reload: async () => {
        productService.contents = await loadProducts();
    },

    getArticles: async (): Promise<Article[]> => {
        return new Promise((resolve, reject) => {
            resolve(productService.contents);
        });
    },

    getArticleById: async (id: number): Promise<Article | null> => {
        return new Promise((resolve, reject) => {
             resolve(productService.contents.find((product) => product.id === id) ?? null);
        });
    },

    getArticlesByTag: async (tag: string): Promise<Article[]> => {
        return new Promise((resolve, reject) => {
            resolve(productService.contents.filter((product) => product.tags.includes(tag)));
        });
    },
}

export {
    productService,
}