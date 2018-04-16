import { getGroup } from '../services/user';

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
  },

  reducers: {
    changeRole(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
