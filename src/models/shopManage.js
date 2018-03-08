import { shopQuery, shopAdd, shopEdit } from '../services/sysSet';

export default {
  namespace: 'shopManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(shopQuery, payload);
      yield put({
        type: 'changeShops',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(shopAdd, payload);
      yield put({
        type: 'addShops',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(shopEdit, payload);
      yield put({
        type: 'editShops',
        payload: response,
      });
    },
  },

  reducers: {
    changeShops(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addShops(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editShops(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
