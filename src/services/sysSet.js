/* eslint-disable no-plusplus,keyword-spacing,semi,prefer-template,no-template-curly-in-string,array-callback-return,max-len */
import { stringify } from 'qs';
import request from '../utils/request';

export async function brandQuery(params) {
  return request(`/api/classes/brand?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function brandAdd(params) {
  return request('/api/classes/brand', {
    method: 'POST',
    body: params,
  });
}

export async function brandEdit(params) {
  const { id, data } = params;
  return request(`/api/classes/brand/${stringify(id)}`, {
    method: 'PUT',
    body: data,
  });
}

export async function brandBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/brand/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function brandDelete(params) {
  return request(`/api/classes/brand/${params[0]}`, {
    method: 'DELETE',
  });
}

export async function regionQuery(params) {
  return request(`/api/classes/Region?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function regionAdd(params) {
  return request('/api/classes/Region', {
    method: 'POST',
    body: params,
  });
}

export async function regionEdit(params) {
  const { ids, data } = params;
  return request(`/api/classes/Region?${stringify(ids)}`, {
    method: 'PUT',
    body: data,
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
  const { ids, data } = params;
  return request(`/api/classes/District?${stringify(ids)}`, {
    method: 'PUT',
    body: data,
  });
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
  const { ids, data } = params;
  return request(`/api/classes/Shop?${stringify(ids)}`, {
    method: 'PUT',
    body: data,
  });
}


export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function getUserList(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function getUsers(params) {
  return request(`/api/users?${stringify(params)}`, {
    method: 'GET',
  });
}
