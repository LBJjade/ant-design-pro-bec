import request from '../utils/request';

export async function getNotices(params) {
  return request(`/api/classes/notices?where=${JSON.stringify(params)}`, {
    method: 'GET',
  });
}
