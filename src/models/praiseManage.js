/* eslint-disable keyword-spacing,no-undef */
import { getPraise, postPraise, putPraise, praiseBatchDelete, deletePraise, praiseRequireQuery, uploadLogo } from '../services/comment';

export default {
  namespace: 'praiseManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    list: {
      results: [],
    },
  },

  effects: {
    *fetchPraise({ payload }, { call, put }) {
      const response = yield call(getPraise, payload);
      yield put({
        type: 'changePraises',
        payload: response,
      });
    },
    *storePraise({ payload }, { call }) {
      yield call(postPraise, payload);
    },
    *coverPraise({ payload }, { call }) {
      yield call(putPraise, payload);
    },
    *removePraise({ payload }, { call }) {
      yield call(deletePraise, payload);
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(praiseBatchDelete, payload);
      yield put({
        type: 'changePraises',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(praiseRequireQuery, payload);
      yield put({
        type: 'changePraises',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changePraises',
        payload: response,
      });
    },
    *exisPraises({ payload }, { call, put }) {
      const response = yield call(praiseRequireQuery, payload);
      yield put({
        type: 'praises',
        payload: response,
      });
    },
    *exisPraiseNos({ payload }, { call, put }) {
      const response = yield call(praiseRequireQuery, payload);
      yield put({
        type: 'praiseNos',
        payload: response,
      });
    },
  },

  reducers: {
    changePraises(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    praises(state, action) {
      return {
        ...state,
        praises: action.payload,
      };
    },
    praiseNos(state, action) {
      return {
        ...state,
        praiseNos: action.payload,
      };
    },
  },
};
