import { Article } from "@/@types/article";
import useArticleCards from "@/components/common/ArticleCard";
import { useSearchFilter } from "@/components/common/SearchFilter";
import { productService } from "@/configs/products";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<Article[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await productService.reload();
      const prod = await productService.getArticles();
      setProducts(prod);
    };
    loadData();
  }, []);

  const {
    filteredArticles,
    SearchFilter,
    handleCardTagClick,
    handleCardStackClick,
    handleReset,
  } = useSearchFilter(products, { shouldFilterByGrade: true });

  const ArticleCards = useArticleCards(filteredArticles, {
    onTagClick: handleCardTagClick,
    onStackClick: handleCardStackClick,
  });

  return (
    <Box sx={{ width: "100%", py: 3 }}>
      {SearchFilter}

      {filteredArticles.length > 0 ? (
        ArticleCards
      ) : (
        <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            一致する制作物が見つかりませんでした
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
    </Box>
  );
};

export default Products;
