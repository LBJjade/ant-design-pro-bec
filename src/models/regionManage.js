/* eslint-disable keyword-spacing */
import { regionQuery, regionAdd, regionEdit, regionBatchDelete, regionDelete, regionRequireQuery } from '../services/sysSet';

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
    *delete({ payload }, { call, put }) {
      const response = yield call(regionDelete, payload);
      yield put({
        type: 'deleteRegions',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
      const response = yield call(regionBatchDelete, payload);
      yield put({
        type: 'deleteRegions',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(regionRequireQuery, payload);
      yield put({
        type: 'queryResult',
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
  deleteRegions(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  queryResult(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
