import { getUsers } from '../services/user';

export default {
  namespace: 'usermodel',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetchUser({ payload }, { call, put }) {
      const response = yield call(getUsers, payload);
      yield put({
        type: 'changeUsers',
        payload: response,
      });
    },
  },

  reducers: {
    changeUsers(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
