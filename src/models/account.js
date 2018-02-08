import { getUsers, getUserMe, getVerifyEmail } from '../services/account';
import { getNotices, putNotice } from '../services/notice';

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
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const resUser = yield call(getUserMe);
      yield put({
        type: 'saveCurrentUser',
        payload: resUser,
      });
      // 仅加载当前用户消息。
      const resNotices = yield call(getNotices, {
        userId: resUser.objectId,
        clear: false,
      });
      yield put({
        type: 'changeNotifys',
        payload: resNotices,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *verifyEmail({ payload }, { call, put }) {
      const ret = yield call(getVerifyEmail, payload);
      yield put({
        type: 'changeVerifying',
        payload: ret,
      });
    },
    *noticeClear({ payload }, { call }) {
      yield call(putNotice, payload);
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
    changeNotifys(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.count,
          notifys: action.payload.results,
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
