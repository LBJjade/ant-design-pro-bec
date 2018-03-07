import { brandQuery, brandAdd } from '../services/sysSet';

export default {
  namespace: 'brandManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(brandQuery, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(brandAdd, payload);
      yield put({
        type: 'addBrands',
        payload: response,
      });
    },
  },

  reducers: {
    changeBrands(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addBrands(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
