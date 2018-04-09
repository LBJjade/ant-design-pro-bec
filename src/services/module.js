/* eslint-disable no-plusplus,spaced-comment,prefer-const,keyword-spacing,prefer-template */
import { stringify } from 'qs';
import request, { requestParams2Url } from '../utils/request';


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
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/module/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function moduleEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/module/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function moduleDelete(params) {
  return request('/api/classes/module/' + params, {
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
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/moduleResource/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function resourceEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/moduleResource/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function resourceDelete(params) {
  return request('/api/classes/moduleResource/' + params, {
    method: 'DELETE',
  });
}

export async function getResource(params) {
  return request(`/api/classes/moduleResource?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function postResource(params) {
  return request('/api/classes/moduleResource', {
    method: 'POST',
    body: params,
  });
}

export async function putResource(params) {
  let editid = params.ojId;
  let data = params.fields;
  request(`/api/classes/moduleResource/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function ResourceBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/moduleResource/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function deleteResource(params) {
  return request('/api/classes/moduleResource/' + params, {
    method: 'DELETE',
  });
}

export async function ResourceRequireQuery(params) {
  let url = requestParams2Url(params);
  return request(`/api/classes/moduleResource${url}`, {
    method: 'GET',
  });
}
