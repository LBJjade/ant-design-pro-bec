/* eslint-disable no-plusplus,keyword-spacing,semi,prefer-template,no-template-curly-in-string,array-callback-return,max-len,prefer-const,no-unused-vars,prefer-destructuring,no-undef,import/no-named-as-default,import/no-duplicates */
import { stringify } from 'qs';
import request, { requestParams2Url } from '../utils/request';

export async function getComment(params) {
  return request(`/api/classes/commentResource?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function postComment(params) {
  request('/api/classes/commentResource', {
    method: 'POST',
    body: params,
  });
}

export async function putComment(params) {
  let editid = params.eidtId;
  let data = params.fields;
  request(`/api/classes/commentResource/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function commentBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/commentResource/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function deleteComment(params) {
  request('/api/classes/commentResource/' + params, {
    method: 'DELETE',
  });
}

export async function commentRequireQuery(params) {
  let url = requestParams2Url(params);
  return request(`/api/classes/commentResource${url}`, {
    method: 'GET',
  });
}

export async function uploadLogo(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/commentResource/', {
    method: 'GET',
    data: require,
  }, 'where');
}

export async function getCommentName(params) {
  return request(`/api/classes/commentResource?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getPraise(params) {
  return request(`/api/classes/praise?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function postPraise(params) {
  return request('/api/classes/praise', {
    method: 'POST',
    body: params,
  });
}

export async function putPraise(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/praise/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function praiseBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/praise/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function deletePraise(params) {
  return request('/api/classes/praise/' + params, {
    method: 'DELETE',
  });
}

export async function praiseRequireQuery(params) {
  let url = requestParams2Url(params);
  return request(`/api/classes/praise${url}`, {
    method: 'GET',
  });
}

export async function regionBrandQuery(params) {
  let url = requestParams2Url(params);
  return request(`/api/classes/AnalysisRule${url}`, {
    method: 'GET',
  });
}

export async function districtQuery(params) {
  return request(`/api/classes/District?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function districtAdd(params) {
  return request('/api/classes/District', {
    method: 'POST',
    body: params,
  });
}

export async function districtEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/District/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function districtBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/District/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function districtDelete(params) {
  return request('/api/classes/District/' + params, {
    method: 'DELETE',
  });
}

export async function districtRequireQuery(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/District/', {
    method: 'GET',
    data: require,
  }, 'where');
}

export async function shopQuery(params) {
  return request(`/api/classes/Shop?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function shopAdd(params) {
  return request('/api/classes/Shop', {
    method: 'POST',
    body: params,
  });
}

export async function shopEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/Shop/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function shopDelete(params) {
  return request('/api/classes/Shop/' + params, {
    method: 'DELETE',
  });
}

export async function shopRequireQuery(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/Shop/', {
    method: 'GET',
    data: require,
  }, 'where');
}

