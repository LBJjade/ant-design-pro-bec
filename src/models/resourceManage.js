import { getUsers } from '../services/user';
import { getSource, addResource, resourceDelete, resourceBatchDelete } from '../services/module';

export default {
  namespace: 'resourceManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
    list: {
      results: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getUsers, payload);
      yield put({
        type: 'changeUser',
        payload: response,
      });
    },
    *getResource(_, { call, put }) {
      const response = yield call(getSource);
      yield put({
        type: 'returnResource',
        payload: response,
      });
    },
    *add({ payload }, { call }) {
      yield call(addResource, payload);
    },
    *delete({ payload }, { call }) {
      yield call(resourceDelete, payload);
    },
    *batchDelete({ payload }, { call }) {
      yield call(resourceBatchDelete, payload);
    },
  },

  reducers: {
    changeUser(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    returnResource(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
