/* eslint-disable keyword-spacing,comma-dangle */
import { regionQuery, regionAdd, regionEdit, regionBatchDelete, regionDelete, regionRequireQuery, getBrand } from '../services/sysSet';

export default {
  namespace: 'regionManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
    list: {
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
        type: 'changeRegions',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(regionEdit, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(regionDelete, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
      const response = yield call(regionBatchDelete, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(regionRequireQuery, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *brandQuery({ payload }, { call, put }) {
      const response = yield call(getBrand, payload);
      yield put({
        type: 'brands',
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
    brands(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
