import { getUsers } from '../services/user';
import { getModule, postModule } from '../services/module';

export default {
  namespace: 'moduleManage',

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
    *getModule(_, { call, put }) {
      const response = yield call(getModule);
      yield put({
        type: 'returnModule',
        payload: response,
      });
    },
    *postModule({ payload }, { call }) {
      yield call(postModule, payload);
    },
  },

  reducers: {
    changeUser(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    returnModule(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    postModule(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
