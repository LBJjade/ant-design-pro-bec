/* eslint-disable no-plusplus,keyword-spacing,semi,prefer-template,no-template-curly-in-string,array-callback-return,max-len,prefer-const */
import { stringify } from 'qs';
import request from '../utils/request';

export async function brandQuery(params) {
  return request(`/api/classes/brand?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function brandAdd(params) {
  return request('/api/classes/brand', {
    method: 'POST',
    body: params,
  });
}

export async function brandEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/brand/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function brandBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/brand/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function brandDelete(params) {
  return request('/api/classes/brand/' + params, {
    method: 'DELETE',
  });
}

export async function brandRequireQuery(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/brand/', {
    method: 'GET',
    data: require,
  }, 'where');
}

export async function uploadLogo(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/brand/', {
    method: 'GET',
    data: require,
  }, 'where');
}

export async function regionQuery(params) {
  return request(`/api/classes/Region?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function regionAdd(params) {
  return request('/api/classes/Region', {
    method: 'POST',
    body: params,
  });
}

export async function regionEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/Region/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function regionBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/Region/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function regionDelete(params) {
  return request('/api/classes/Region/' + params, {
    method: 'DELETE',
  });
}

export async function regionRequireQuery(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/Region/', {
    method: 'GET',
    data: require,
  }, 'where');
}

export async function districtQuery(params) {
  return request(`/api/classes/District?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function districtAdd(params) {
  return request('/api/classes/District', {
    method: 'POST',
    body: params,
  });
}

export async function districtEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/District/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function districtBatchDelete(params) {
  for(let i = 0; i < params.length; i++) {
    request(`/api/classes/District/${params[i]}`, {
      method: 'DELETE',
    });
  }
}

export async function districtDelete(params) {
  return request('/api/classes/District/' + params, {
    method: 'DELETE',
  });
}

export async function districtRequireQuery(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/District/', {
    method: 'GET',
    data: require,
  }, 'where');
}

export async function shopQuery(params) {
  return request(`/api/classes/Shop?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function shopAdd(params) {
  return request('/api/classes/Shop', {
    method: 'POST',
    body: params,
  });
}

export async function shopEdit(params) {
  let editid = params.eidtId;
  let data = params.fields;
  return request(`/api/classes/Shop/${editid}`, {
    method: 'PUT',
    body: data,
  });
}

export async function shopDelete(params) {
  return request('/api/classes/Shop/' + params, {
    method: 'DELETE',
  });
}

export async function shopRequireQuery(params) {
  let require = `'where={${stringify(params)}}'`;
  return request('/api/classes/Shop/', {
    method: 'GET',
    data: require,
  }, 'where');
}

