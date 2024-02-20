import Koa from 'koa';
import Router, { RouterContext } from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { CustomErrorMessageFunction, query, body, validationResults } from 'koa-req-validation';
import { router as articlesRouter } from '../routes/articles';

const app: Koa = new Koa();
const router: Router = new Router();

router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = { msg: 'Hello world!' };
  await next();
});

const custom404 = async (ctx: RouterContext, next: any) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { err: 'No such endpoint existed' };
    }
  } catch (err: any) {
    ctx.body = { err: err };
  }
};

const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = {
    msg: 'Welcome to the API',
  }

  await next();
}

router.get('/api/v1', welcomeAPI);


app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(articlesRouter.routes()).use(articlesRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

const customErrorMessage: CustomErrorMessageFunction = (_ctx: RouterContext, value: string) => {
  return (
    `The name must be between 3 and 20 ` + `characters long but received length ${value.length}`
  );
};

const validatorName = [query('name').isLength({ min: 3 }).withMessage(customErrorMessage).build()];

router.get('/', ...validatorName, async (ctx: RouterContext, next: any) => {
  const result = validationResults(ctx);

  if (result.hasErrors()) {
    ctx.status = 422;
    ctx.body = { err: result.mapped() };
  } else {
    ctx.body = { msg: `Hello ${ctx.query.name}` };
  }

  await next();
});

app.use(custom404);

app.listen(10888, () => {
  console.log('Koa Started');
});
