import * as db from '../helpers/db';

export const getById = async (id: number) => {
  let query = 'SELECT * FROM articles WHERE ID=?';
  let values = [id];
  let data = await db.run_query(query, values);

  return data;
};

export const getAll = async () => {
  let query = 'Select * from articles';
  let data = await db.run_query(query, null);

  return data;
};

export const add = async (article: any) => {
  const keys = Object.keys(article);
  const values = Object.values(article);

  const key = keys.join(',');
  let param = '';

  for (const _ of keys) {
    param += '?,';
  }

  param = param.slice(0, -1);

  const query = `INSERT INTO articles (${key}) VALUES (${param})`;

  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
};
