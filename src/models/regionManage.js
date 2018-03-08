import { regionQuery, regionAdd, regionEdit } from '../services/sysSet';

export default {
  namespace: 'regionManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(regionQuery, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(regionAdd, payload);
      yield put({
        type: 'addRegions',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(regionEdit, payload);
      yield put({
        type: 'editRegions',
        payload: response,
      });
    },
    *getBrand({ payload }, { call, put }) {
      const response = yield call(regionEdit, payload);
      yield put({
        type: 'editRegions',
        payload: response,
      });
    },
  },

  reducers: {
    changeRegions(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addRegions(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editRegions(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
