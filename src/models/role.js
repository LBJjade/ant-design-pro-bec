import { getRole } from '../services/user';

export default {
  namespace: 'role',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getRole, payload);
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
