import { Article, Service, DB } from "@/@types/common";
type Product = Readonly<{}> & Article;

const loadDB = async (): Promise<DB> => {
    return await import("../../db.json");
}
const loadProducts = async (): Promise<Product[]> => {
    return (await loadDB()).products;
}

const productService: Service = {

    contents: await loadProducts(),

    getNextId: () => {
        return productService.contents.reduce((max, product) => Math.max(max, product?.id ?? 0), 0) + 1;
    },

    reload: async () => {
        productService.contents = await loadProducts();
    },

    getArticles: async (): Promise<Product[]> => {
        return new Promise((resolve, reject) => {
            resolve(productService.contents);
        });
    },

    getArticleById: async (id: number): Promise<Product | null> => {
        return new Promise((resolve, reject) => {
             resolve(productService.contents.find((product) => product.id === id) ?? null);
        });
    },

    getArticlesByTag: async (tag: string): Promise<Product[]> => {
        return new Promise((resolve, reject) => {
            resolve(productService.contents.filter((product) => product.tags.includes(tag)));
        });
    },
}

const products: Product[] = await productService.getArticles();

export {
    productService,
    products,
}