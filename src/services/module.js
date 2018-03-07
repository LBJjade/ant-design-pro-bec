import request from '../utils/request';

export async function getModule() {
  return request('/api/classes/module', {
    method: 'GET',
  });
}

export async function getSource() {
  return request('/api/classes/moduleResource', {
    method: 'GET',
  });
}


export async function postModule(params) {
  return request('/api/classes/role', {
    method: 'POST',
    headers: { 'X-Parse-Session-Token': localStorage.token },
    // data: '{"roleId":12,"RoleName":"超级管理员","authority":3,"status":1}',
    body: {
      ...params,
      method: 'post',
    },
  });
}
