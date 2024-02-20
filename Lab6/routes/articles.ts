import Koa from 'koa';
import Router, { RouterContext } from 'koa-router';
import bodyParser from 'koa-bodyparser';

const router = new Router({
  prefix: '/api/v1/articles',
});

const articles = [
  { id: 1, title: 'hello article', fullText: 'some text here to fill the body' },
  { id: 2, title: 'article 1', fullText: 'This is the first article' },
  { id: 3, title: 'article 2', fullText: 'This is the second article' },
  { id: 4, title: 'article 3', fullText: 'This is the third article' },
  { id: 5, title: 'article 4', fullText: 'This is the fourth article' },
  { id: 6, title: 'article 5', fullText: 'This is the fifth article' },
];

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles;
  await next();
};

const getById = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id;
  const article = articles.find((article) => article.id === parseInt(id));
  if (article) {
    ctx.body = article;
  } else {
    ctx.status = 404;
    ctx.body = { err: 'No such article existed' };
  }

  await next();
};

const createArticle = async (ctx: RouterContext, next: any) => {
  const { title, fullText } = ctx.request.body as { title: string; fullText: string };
  const newArticle = { id: articles.length + 1, title, fullText };
  articles.push(newArticle);

  ctx.status = 201;
  ctx.body = articles;
  await next();
};

const updateArticle = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id;
  const { title, fullText } = ctx.request.body as { title: string; fullText: string };
  const article = articles.find((article) => article.id === parseInt(id));

  if (article) {
    article.title = title;
    article.fullText = fullText;
    ctx.body = articles;
  } else {
    ctx.status = 404;
    ctx.body = { err: 'No such article existed' };
  }

  await next();
};

const deleteArticle = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id;
  const article = articles.find((article) => article.id === parseInt(id));
  if (article) {
    articles.splice(articles.indexOf(article), 1);
    ctx.body = articles;
  } else {
    ctx.status = 404;
    ctx.body = { err: 'No such article existed' };
  }
};

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', bodyParser(), createArticle);
router.put('/:id([0-9]{1,})', updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };
