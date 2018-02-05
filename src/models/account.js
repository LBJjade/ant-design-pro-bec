import { getUsers, getUserMe, getVerifyEmail } from '../services/account';

export default {
  namespace: 'account',

  state: {
    list: [],
    loading: false,
    currentUser: {},
    verifyResult: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getUsers);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUserMe);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *verifyEmail({ payload }, { call, put }) {
      const ret = yield call(getVerifyEmail, payload);
      yield put({
        type: 'changeVerifying',
        payload: ret,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    changeVerifying(state, { payload }) {
      return {
        ...state,
        verifyResult: payload,
      };
    },
  },
};
