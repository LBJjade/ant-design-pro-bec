/* eslint-disable prefer-const */
import { stringify } from 'qs';
import request from '../utils/request';

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

export async function queryRole() {
  return request('/api/role');
}

export async function queryCurrentRole() {
  return request('/api/currentUser');
}

export async function getUserListRole(params) {
  return request(`/api/Role?${stringify(params)}`);
}


export async function getRole() {
  return request('/api/classes/role', {
    method: 'GET',
  });
}

export async function queryGroup() {
  return request('/api/group');
}

export async function queryCurrentGroup() {
  return request('/api/currentUser');
}

export async function getUserListGroup(params) {
  return request(`/api/group?${stringify(params)}`);
}


export async function getGroup() {
  return request('/api/classes/group', {
    method: 'GET',
  });
}

export async function postGroup(params) {
  return request('/api/classes/group', {
    method: 'POST',
    body: params,
  });
}

export async function putGroup(params) {
  const editid = params.ojId;
  const data = params.fields;
  request(`/api/classes/group/${editid}`, {
    method: 'PUT',
    body: data,
  });
}
export async function deleteGroup(params) {
  return request(`/api/classes/group/${params}`, {
    method: 'DELETE',
  });
}

