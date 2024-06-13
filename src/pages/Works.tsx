import React, { useEffect, useState } from 'react';
import { workService } from '@/configs/works';
import useArticleCards from '@/components/common/ArticleCard';
import { Article } from '@/@types/article';
import { Box, Link, Typography } from '@mui/material';


const Works = () => {
    const [works, setProducts] = useState<Article[]>([]);
    const ArticleCards = useArticleCards(works);

    useEffect(() => {
        const loadData = async() => {
            const ws = await workService.getArticles();
            setProducts(ws);
        }
        loadData();
    }, []);

    const linkStyle = {
        margin: 1,
    };

    return (
        <Box sx={{ textAlign: "center" }}>
            {ArticleCards}
            <Typography variant="body1" sx={{ margin: 1 }} gutterBottom>
                <Link sx={linkStyle} href='https://dl.nkmr-lab.org/?q=%E6%B8%A1%E9%82%89%20%E5%81%A5%E6%96%97'>研究一覧</Link>
                <Link sx={linkStyle} href='https://nkmr-lab.org/?s=%E6%B8%A1%E9%82%89%E5%81%A5%E6%96%97&x=0&y=0'>記事一覧</Link>
            </Typography>
        </Box>
    );
}

export default Works;