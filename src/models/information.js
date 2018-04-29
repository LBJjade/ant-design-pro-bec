import { getInformation, putInformation } from '../services/information';

export default {
  namespace: 'information',

  state: {
    data: {
      results: [],
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
    *fetch({ payload }, { call, put }) {
      const response = yield call(getInformation, payload);
      yield put({
        type: 'changedata',
        payload: response,
      });
    },
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
    *fetchNewNotice({ payload }, { call, put }) {
      const response = yield call(getInformation, payload);
      yield put({
        type: 'changeNewNotice',
        payload: response,
      });
    },
  },

  reducers: {
    changedata(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
    changeNewNotice(state, action) {
      return {
        ...state,
        notice: {
          results: state.notice.results.concat(action.payload.results),
          count: action.payload.count,
        },
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
