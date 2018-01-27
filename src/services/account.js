import { stringify } from 'qs';
import request from '../utils/request';

export async function getUsers(params) {
  return request(`/api/users?where=${JSON.stringify(params)}`, {
    method: 'GET',
  });
}

export async function getUsers2(params) {
  // const { where, keys } = params;

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

export async function queryUsers(params) {
  // return request(`/api/users?${stringify(params)}`);
  return request(`/api/users?where=${JSON.stringify(params)}`, {
    method: 'GET',
  });
}
