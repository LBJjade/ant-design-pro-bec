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

//action
export async function getSource() {
  return request('/api/classes/actionGroup', {
    method: 'GET',
  });
}

export async function addAction(params) {
  return request('/api/classes/actionGroup', {
    method: 'POST',
    body: params,
  });
}

export async function actionBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/actionGroup/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function actionEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/actionGroup/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function actionDelete(params) {
  return request('/api/classes/actionGroup/' + params, {
    method: 'DELETE',
  });
}

export async function getAction(params) {
  return request(`/api/classes/actionGroup?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function postAction(params) {
  return request('/api/classes/actionGroup', {
    method: 'POST',
    body: params,
  });
}

export async function putAction(params) {
  let editid = params.ojId;
  let data = params.fields;
  request(`/api/classes/actionGroup/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function ActionBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/actionGroup/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function deleteAction(params) {
  return request('/api/classes/actionGroup/' + params, {
    method: 'DELETE',
  });
}

export async function ActionRequireQuery(params) {
  let url = requestParams2Url(params);
  return request(`/api/classes/actionGroup${url}`, {
    method: 'GET',
  });
}
