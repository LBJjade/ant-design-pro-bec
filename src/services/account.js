import { stringify } from 'qs';
import request, {requestParams2Url} from '../utils/request';

export async function getUsers(params) {
  return request(`/api/users${requestParams2Url(params)}`, {
    method: 'GET',
  });
}

export async function postUser(params) {
  return request('/api/users', {
    method: 'POST',
    body: params,
  });
}

export async function putUser(params) {
  const { objectid, data } = params;
  return request(`/api/users/${objectid}`, {
    method: 'PUT',
    headers: { 'X-Parse-Session-Token': localStorage.token },
    body: data,
  });
}

export async function getLogin(params) {
  return request(`/api/login?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getUserMe() {
  return request('/api/users/me', {
    method: 'GET',
    headers: { 'X-Parse-Session-Token': localStorage.token },
  });
}

export async function postPasswordReset(email) {
  return request('/api/requestPasswordReset', {
    method: 'POST',
    body: email,
  });
}

export async function getVerifyEmail(params) {
  return request(`/mail/verify_email${params}`, {
    method: 'GET',
  });
}
