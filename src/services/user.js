import { stringify } from 'qs';
import request, { requestParams2Url } from '../utils/request';

export async function query() {
  return request('/api/users');
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

export async function getUserLastMount(params) {
  const url = requestParams2Url(params);
  return request(`/api/users${url}`, {
    method: 'GET',
  });
}

export async function getUserThisMount(params) {
  const url = requestParams2Url(params);
  return request(`/api/users${url}`, {
    method: 'GET',
  });
}

export async function getUserThisWeek(params) {
  const url = requestParams2Url(params);
  return request(`/api/users${url}`, {
    method: 'GET',
  });
}

export async function userRequireQuery(params) {
  const url = requestParams2Url(params);
  return request(`/api/users${url}`, {
    method: 'GET',
  });
}
