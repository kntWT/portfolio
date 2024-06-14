import { MuiIcon } from '@/@types/common';
import { Article, LinkType } from '@/@types/article';
import { Box, Card, CardActions, CardContent, CardMedia, Grid, Link, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ArticleCard = (props: {
  article: Article,
  showDetail?: boolean,
}) => {
  const tagStyle = {
    paddingRight: '0.5rem',
    color: "blue",
    fontSize: '0.8rem bold',
  };

  const mainLink = props.article.links.find(link => link.type === 'url') ?? props.article.links?.[0];
  const getLinkIcon = (linkType: LinkType): EmotionJSX.Element => {
    switch (linkType) {
      case "url":
        return <LinkIcon sx={{ verticalAlign: "middle" }} />;
      case "github":
        return <GitHubIcon sx={{ verticalAlign: "middle" }} />;
      case "blog":
        return <ArticleIcon sx={{ verticalAlign: "middle" }} />;
      case "paper":
        return <LibraryBooksIcon sx={{ verticalAlign: "middle" }} />;
      case "video":
        return <OndemandVideoIcon sx={{ verticalAlign: "middle" }} />;
      default:
        return <LinkIcon sx={{ verticalAlign: "middle" }} />;
    }
  };

  const imageSrc = props.article.image.startsWith('http') ? props.article.image : `/images/thumbnails/${props.article.image}`;

  return (
      <Card
        elevation={3}
        sx={{
          margin: 2,
          padding: "24px 24px 0",
          width: '100%',
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <CardMedia
          component="img"
          src={imageSrc}
          height="50%"
          alt={props.article.title}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography variant='h6' sx={{ marginTop: 1, textAlign: "center" }}>{props.article.title}</Typography>
          <Typography sx={{ textAlign: "center" }} variant='subtitle1'>{props.article.year}年</Typography>
          <Box sx={{ margin: 2 }}>
            {props.showDetail && <Typography variant='body1'>{props.article.description}</Typography>}
          </Box>
          {props.showDetail && props.article.stacks && <Box sx={{ margin: 2 }}>
            <Typography variant='subtitle2'>技術スタック</Typography>
            <Typography variant='body2'>
              {props.article.stacks.join(', ')}
            </Typography>
          </Box>}
          <Typography variant='body1'>
            {props.article.tags.map((tag, i) => <span style={tagStyle} key={`${i}`}>#{tag}</span>)}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant='subtitle2'>
            {props.showDetail?
              props.article.links.map((link, i) =>
                (<Box key={`${i}`}>
                  {getLinkIcon(link.type)}
                  <Link key={`${i}`} href={link.url} target='_blank' style={tagStyle}>
                    {link.text ?? link.url}
                  </Link>
              </Box>)):
              (props.article.links.length > 0 ?
                <>
                  {getLinkIcon(mainLink.type)}
                  <Link href={mainLink.url} target='_blank' style={tagStyle}>{mainLink.text ?? mainLink.url}</Link>
                </> : <>
                  <LinkOffIcon sx={{ verticalAlign: "middle" }} />
                  <Typography component="span">no external link</Typography>
                </>
              )
            }
          </Typography>
        </CardActions>
      </Card>
  );
}

const useArticleCards = (props: Article[]) => {
  const [open, setOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const handleOpen = (article: Article) => {
    setOpen(true);
    setActiveArticle(article);
  }
  const handleClose = () => {
    setOpen(false);
    setActiveArticle(null);
  }

  const modalStyle = {
    width: "100vw",
    height: "100vh",
    bgcolor: 'background.paper',
  };

  return (
    <>
    <Grid container spacing={2} sx={{ paddingRight: 4}}>
      {props.map((article, i) => (
        <Grid item key={`${i}`} xs={12} sm={6} md={4} lg={3} sx={{ aspectRatio: {xs: "1/1", xl: "16/9"} }} onClick={() => handleOpen(article)}>
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
      >
        <Box sx={{ width: "80vw", maxWidth: "1150px", height: "80vh", margin: "auto" }}>
          {activeArticle && <ArticleCard article={activeArticle} showDetail={true} />}
        </Box>
      </Modal>
    </>
  );
}

export default useArticleCards;