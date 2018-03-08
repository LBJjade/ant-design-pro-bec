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
  const { ids, data } = params;
  return request(`/api/classes/brand?${stringify(ids)}`, {
    method: 'PUT',
    body: data,
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

export async function cityQuery(params) {
  return request(`/api/classes/City?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function cityAdd(params) {
  return request('/api/classes/City', {
    method: 'POST',
    body: params,
  });
}

export async function cityEdit(params) {
  const { ids, data } = params;
  return request(`/api/classes/City?${stringify(ids)}`, {
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
