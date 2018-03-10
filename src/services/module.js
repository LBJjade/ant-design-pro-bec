/* eslint-disable no-plusplus,spaced-comment */
import { stringify } from 'qs';
import request from '../utils/request';


//module
export async function getModule() {
  return request('/api/classes/module', {
    method: 'GET',
  });
}

export async function postModule(params) {
  return request('/api/classes/module', {
    method: 'POST',
    body: params,
  });
}

export async function moduleBatchDelete(params) {
  for (let i = 0; i < params.length; i++) {
    return request(`/api/classes/module?${stringify(params[i])}`, {
      method: 'DELETE',
    });
  }
}

export async function moduleDelete(params) {
  return request(`/api/classes/module?${stringify(params)}`, {
    method: 'DELETE',
  });
}

//resource
export async function getSource() {
  return request('/api/classes/moduleResource', {
    method: 'GET',
  });
}

export async function addResource(params) {
  return request('/api/classes/moduleResource', {
    method: 'POST',
    body: params,
  });
}

export async function resourceBatchDelete(params) {
  for (let i = 0; i < params.length; i++) {
    return request(`/api/classes/moduleResource?${stringify(params[i])}`, {
      method: 'DELETE',
    });
  }
}

export async function resourceDelete(params) {
  return request(`/api/classes/moduleResource?${stringify(params)}`, {
    method: 'DELETE',
  });
}

