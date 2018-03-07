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
