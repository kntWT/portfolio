import React, { useEffect, useState } from 'react';
import { productService } from '@/configs/products';
import useArticleCards from '@/components/common/ArticleCard';
import { Article } from '@/@types/article';


const Products = () => {
    const [products, setProducts] = useState<Article[]>([]);
    const ArticleCards = useArticleCards(products);

    useEffect(() => {
        const loadData = async() => {
            const prod = await productService.getArticles();
            setProducts(prod);
        }
        loadData();
    }, []);

    return (
        ArticleCards
    );
}

export default Products;