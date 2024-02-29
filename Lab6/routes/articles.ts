import Koa from 'koa';
import Router, { RouterContext } from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as model from '../models/articles.model';

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
  const articles = await model.getAll();

  ctx.body = articles;

  await next();
};

const getById = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.id;
  let articles = await model.getById(parseInt(id));

  if (articles?.length > 0) {
    ctx.body = articles[0];
  } else {
    ctx.status = 404;
  }

  await next();
};

const createArticle = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  const result = await model.add(body);

  if (result.status === 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: 'insert data failed' };
  }
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
