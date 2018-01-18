import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryUserList(params) {
  // return request('/api/users');
  console.log(`/api/users?${stringify(params)}`);
  return request(`/api/users?${stringify(params)}`);
}
