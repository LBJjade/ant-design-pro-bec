import { getInformation, putInformation } from '../services/information';

export default {
  namespace: 'information',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    notice: {
      results: [],
      count: 0,
      state: [],
    },
    news: {
      results: [],
      count: 0,
      state: [],
    },
    need: {
      results: [],
      count: 0,
      state: [],
    },
  },

  effects: {
    *fetchNotice({ payload }, { call, put }) {
      const response = yield call(getInformation, payload);
      yield put({
        type: 'changeNotice',
        payload: response,
      });
    },
    *fetchNew({ payload }, { call, put }) {
      const response = yield call(getInformation, payload);
      yield put({
        type: 'changeMessages',
        payload: response,
      });
    },
    *fetchNeed({ payload }, { call, put }) {
      const response = yield call(getInformation, payload);
      yield put({
        type: 'changeNeed',
        payload: response,
      });
    },
    *coverInformation({ payload }, { call }) {
      yield call(putInformation, payload);
    },
  },

  reducers: {
    changeNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
    changeMessages(state, action) {
      return {
        ...state,
        news: action.payload,
      };
    },
    changeNeed(state, action) {
      return {
        ...state,
        need: action.payload,
      };
    },
  },
};
