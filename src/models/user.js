/* eslint-disable no-dupe-keys */
import { getUsers, getUserLastMount, getUserThisMount, getUserThisWeek, userRequireQuery } from '../services/user';

export default {
  namespace: 'user',

  state: {
    data: {
      results: [],
      count: 0,
    },
    mountlist: {
      results: [],
      count: 0,
    },
    weeklist: {
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
    *fetchUserLastMount({ payload }, { call, put }) {
      const response = yield call(getUserLastMount, payload);
      yield put({
        type: 'changeLastMountUsers',
        payload: response,
      });
    },
    *fetchUserThisMount({ payload }, { call, put }) {
      const response = yield call(getUserThisMount, payload);
      yield put({
        type: 'changeThisMountUsers',
        payload: response,
      });
    },
    *fetchUserThisWeek({ payload }, { call, put }) {
      const response = yield call(getUserThisWeek, payload);
      yield put({
        type: 'changeThisWeekUsers',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(userRequireQuery, payload);
      yield put({
        type: 'changeLastMountUsers',
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
    changeLastMountUsers(state, action) {
      return {
        ...state,
        // data: action.payload,
        data: {
          results: action.payload.results,
          count: action.payload.results.length,
        },
      };
    },
    changeThisMountUsers(state, action) {
      return {
        ...state,
        mountlist: action.payload,
      };
    },
    changeThisWeekUsers(state, action) {
      return {
        ...state,
        weeklist: action.payload,
      };
    },
  },
};
