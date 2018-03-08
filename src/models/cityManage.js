import { cityQuery, cityAdd, cityEdit } from '../services/sysSet';

export default {
  namespace: 'cityManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(cityQuery, payload);
      yield put({
        type: 'changeCitys',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(cityAdd, payload);
      yield put({
        type: 'addCitys',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(cityEdit, payload);
      yield put({
        type: 'editCitys',
        payload: response,
      });
    },
  },

  reducers: {
    changeCitys(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addCitys(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editCitys(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
