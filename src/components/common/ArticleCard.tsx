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

  const mainLink = props.article.links.find(link => link.type === 'url');
  const getLinkIcon = (linkType: LinkType): EmotionJSX.Element => {
    switch (linkType) {
      case "url":
        return <LinkIcon />;
      case "github":
        return <GitHubIcon />;
      case "blog":
        return <ArticleIcon />;
      case "paper":
        return <LibraryBooksIcon />;
      case "video":
        return <OndemandVideoIcon />;
      default:
        return <LinkIcon />;
    }
  };

  const imageSrc = props.article.image.startsWith('http') ? props.article.image : `/images/thumbnails/${props.article.image}`;

  return (
      <Card
        elevation={3}
        sx={{
          margin: 2,
          padding: 3,
          width: '100%',
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <CardMedia
          component="img"
          src={imageSrc}
          height="60%"
          alt={props.article.title}
          sx={{ objectFit: props.showDetail ? 'contain' : 'cover'}}
        />
        <CardContent>
          <Typography variant='h6' sx={{ margin: 1, textAlign: "center" }}>{props.article.title}</Typography>
          <Typography sx={{ textAlign: "center" }} variant='subtitle1'>{props.article.year}年</Typography>
          <Box sx={{ margin: 2 }}>
            {props.showDetail && <Typography variant='body1'>{props.article.description}</Typography>}
          </Box>
          <Typography variant='body1'>
            {props.article.tags.map((tag, i) => <span style={tagStyle} key={`${i}`}>#{tag}</span>)}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant='subtitle2'>
            {props.showDetail && props.article.links.length > 0 ?
              props.article.links.map((link, i) =>
                (<Box key={`${i}`}>
                  {getLinkIcon(link.type)}
                  <Link key={`${i}`} href={link.url} target='_blank' style={tagStyle}>
                    {link.text ?? link.url}
                  </Link>
              </Box>)):
              (mainLink ?
                <>
                  <LinkIcon sx={{ verticalAlign: "middle" }} />
                  <Link href={mainLink.url} target='_blank' style={tagStyle}>{mainLink.text ?? mainLink.url}</Link>
                </> : <>
                  <LinkOffIcon sx={{ verticalAlign: "middle" }} />
                  <Typography>no external link</Typography>
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
        <Grid item key={`${i}`} xs={12} sm={6} md={4} lg={3} sx={{ aspectRatio: {xs: "1/1", md: "16/9"} }} onClick={() => handleOpen(article)}>
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