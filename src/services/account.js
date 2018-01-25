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
}

export async function queryUsers(params) {
  // return request(`/api/users?${stringify(params)}`);
  return request(`/api/users?where=${JSON.stringify(params)}`, {
    method: 'GET',
  });
}

// ----------------------------------------------------------------------
export async function getUsers(params) {
  return request(`/api/users?where=${JSON.stringify(params)}`, {
    method: 'GET',
  });
}

export async function postUsers(params) {
  return request('/api/users', {
    method: 'POST',
    body: params,
  });
}

export async function getLogin(params) {
  return request(`/api/login?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getCurrentUser() {
  return request('/api/users/me', {
    method: 'GET',
    headers: { 'X-Parse-Session-Token': 'r:ec7fa31146bc5f8aece74b5b225533df' },
  });
}
