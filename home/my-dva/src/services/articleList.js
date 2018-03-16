import request from '../utils/request';

export async function getArticleList({ id }) {
  /*const obj = {id};
  const params = new FormData();
  params.append("id",obj.id);*/

  return request('/reactBlock/api/getArticleList.php',{
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    body: JSON.stringify({
      id
    }),
    //body: params,
  });
}

export async function delArticle({ id,fid }) {
  /*const obj = {id};
  const params = new FormData();
  params.append("id",obj.id);*/

  return request('/reactBlock/api/deleteBlock.php',{
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    body: JSON.stringify({
      id,fid
    }),
    //body: params,
  });
}
