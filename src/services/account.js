import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// Min 2018-01-08
export async function accountRegister(params) {
  return request('/api/users', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogin(params) {
  return request('/api/account/login', {
    method: 'POST',
    body: params,
  });
  // return request(`/api/users?${stringify(params)}`);
}

export async function queryUsers(params) {
  return request(`/api/users?${stringify(params)}`);
}

