import { Article } from "@/@types/article";
import useArticleCards from "@/components/common/ArticleCard";
import { useSearchFilter } from "@/components/common/SearchFilter";
import { ARTICLE_REPOSITORY_URL, PAPER_REPOSITORY_URL } from "@/configs/url";
import { workService } from "@/configs/works";
import { Box, Button, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Works = () => {
  const [works, setWorks] = useState<Article[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await workService.reload();
      const ws = await workService.getArticles();
      setWorks(ws);
    };
    loadData();
  }, []);

  const {
    filteredArticles,
    SearchFilter,
    handleCardTagClick,
    handleCardStackClick,
    handleReset,
  } = useSearchFilter(works, { shouldFilterByGrade: false });

  const ArticleCards = useArticleCards(filteredArticles, {
    onTagClick: handleCardTagClick,
    onStackClick: handleCardStackClick,
  });

  const linkStyle = {
    margin: 1,
  };

  return (
    <Box sx={{ width: "100%", py: 3 }}>
      {SearchFilter}

      {filteredArticles.length > 0 ? (
        ArticleCards
      ) : (
        <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            一致する研究・記事が見つかりませんでした
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            検索キーワードや選択中のタグを変更してお試しください。
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ borderRadius: "20px" }}
          >
            検索条件をクリア
          </Button>
        </Box>
      )}

      <Typography
        variant="body1"
        sx={{ margin: 1, textAlign: "center", mt: 6 }}
        gutterBottom
      >
        <Link
          sx={linkStyle}
          href={`${PAPER_REPOSITORY_URL}/?q=%E6%B8%A1%E9%82%89%20%E5%81%A5%E6%96%97&sort=asc`}
        >
          研究一覧
        </Link>
        <Link
          sx={linkStyle}
          href={`${ARTICLE_REPOSITORY_URL}/?s=%E6%B8%A1%E9%82%89%E5%81%A5%E6%96%97&x=0&y=0`}
        >
          記事一覧
        </Link>
      </Typography>
    </Box>
  );
};

export default Works;
