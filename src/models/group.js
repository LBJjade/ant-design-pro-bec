import { Message } from 'antd';
import { getGroup, postGroup, putGroup, deleteGroup } from '../services/user';

export default {
  namespace: 'group',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getGroup, payload);
      yield put({
        type: 'changeRole',
        payload: response,
      });
    },
    *storeGroup({ payload }, { call, put }) {
      const response = yield call(postGroup, payload);
      yield put({
        type: 'appendGroups',
        payload: { results: [Object.assign(payload, response)] },
      });
      Message.success('新增成功');
    },
    *coverGroup({ payload }, { call }) {
      const response = yield call(putGroup, payload);
      if (response !== undefined) {
        if (JSON.parse(response).error === undefined) {
          Message.success('编辑成功');
        } else {
          Message.error('编辑失败');
        }
      } else {
        Message.success('编辑成功');
      }
    },
    *removeGroup({ payload }, { call }) {
      const response = yield call(deleteGroup, payload);
      if (JSON.parse(response).error === undefined) {
        Message.success('删除成功');
      } else {
        Message.error('删除失败');
      }
    },
  },

  reducers: {
    changeRole(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    appendGroups(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.concat(action.payload.results),
          count: state.data.count + 1,
        },
      };
    },
  },
};
