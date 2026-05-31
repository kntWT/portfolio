import { Article, LinkType } from "@/@types/article";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ArticleCard = (props: { article: Article; showDetail?: boolean }) => {
  const tagStyle = {
    marginRight: "0.4rem",
    marginBottom: "0.4rem",
  };

  const mainLink =
    props.article.links.find((link) => link.type === "url") ??
    props.article.links?.[0];
  const getLinkIcon = (linkType: LinkType) => {
    switch (linkType) {
      case "url":
        return <LinkIcon sx={{ fontSize: "1.1rem" }} />;
      case "github":
        return <GitHubIcon sx={{ fontSize: "1.1rem" }} />;
      case "blog":
        return <ArticleIcon sx={{ fontSize: "1.1rem" }} />;
      case "paper":
        return <LibraryBooksIcon sx={{ fontSize: "1.1rem" }} />;
      case "video":
        return <OndemandVideoIcon sx={{ fontSize: "1.1rem" }} />;
      default:
        return <LinkIcon sx={{ fontSize: "1.1rem" }} />;
    }
  };

  const imageSrc = props.article.image.startsWith("http")
    ? props.article.image
    : `/images/thumbnails/${props.article.image}`;

  return (
    <Card
      sx={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "background.paper",
        transition:
          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: props.showDetail ? "default" : "pointer",
        "&:hover": props.showDetail
          ? {}
          : {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
            },
      }}
    >
      <Box
        sx={{ position: "relative", pt: "56.25%", backgroundColor: "#f5f5f7" }}
      >
        <CardMedia
          component="img"
          src={imageSrc}
          alt={props.article.title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            p: props.showDetail ? 2 : 1,
          }}
        />
      </Box>
      <CardContent
        sx={{
          padding: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            lineHeight: 1.4,
            mb: 1,
            color: "text.primary",
          }}
        >
          {props.article.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            mb: 2,
          }}
        >
          {props.article.year}年
        </Typography>

        {props.showDetail && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 3,
              whiteSpace: "pre-wrap",
            }}
          >
            {props.article.description}
          </Typography>
        )}

        {props.showDetail && props.article.stacks && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                display: "block",
                mb: 0.5,
              }}
            >
              技術スタック
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {props.article.stacks.map((stack, i) => (
                <Chip
                  key={i}
                  label={stack}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: "6px" }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: "auto", display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {props.article.tags.map((tag, i) => (
            <Chip
              key={i}
              label={`#${tag}`}
              size="small"
              sx={{
                backgroundColor: "rgba(25, 118, 210, 0.05)",
                color: "secondary.main",
                fontWeight: 600,
                fontSize: "0.75rem",
                borderRadius: "6px",
                "& .MuiChip-label": { px: 1 },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, width: "100%" }}>
          {props.showDetail ? (
            props.article.links.map((link, i) => (
              <Button
                key={i}
                variant="outlined"
                size="small"
                startIcon={getLinkIcon(link.type)}
                href={link.url}
                target="_blank"
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "secondary.main",
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                    color: "secondary.main",
                  },
                }}
              >
                {link.text ?? "Link"}
              </Button>
            ))
          ) : props.article.links.length > 0 ? (
            <Button
              variant="text"
              size="small"
              startIcon={getLinkIcon(mainLink.type)}
              href={mainLink.url}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              sx={{
                textTransform: "none",
                color: "secondary.main",
                fontWeight: 600,
                p: 0,
                minWidth: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.8,
                },
              }}
            >
              {mainLink.text ?? "詳細を見る"}
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "text.disabled",
              }}
            >
              <LinkOffIcon sx={{ fontSize: "1.1rem" }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                リンクなし
              </Typography>
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

const useArticleCards = (props: Article[]) => {
  const [open, setOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const handleOpen = (article: Article) => {
    setOpen(true);
    setActiveArticle(article);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveArticle(null);
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  };

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ width: "100%", margin: 0, paddingRight: { xs: 0, sm: 4 } }}
      >
        {props.map((article, i) => (
          <Grid
            item
            key={`${i}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => handleOpen(article)}
          >
            <ArticleCard article={article} showDetail={false} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        sx={modalStyle}
        onClose={handleClose}
        disableAutoFocus
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "90vw",
            maxWidth: "700px",
            maxHeight: "90vh",
            outline: "none",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.15)",
          }}
        >
          {activeArticle && (
            <ArticleCard article={activeArticle} showDetail={true} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default useArticleCards;
