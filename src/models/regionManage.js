/* eslint-disable keyword-spacing,comma-dangle */
import { getRegion, postRegion, putRegion, regionBatchDelete, deleteRegion, regionRequireQuery, getBrand } from '../services/sysSet';

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
    *fetchRegion({ payload }, { call, put }) {
      const response = yield call(getRegion, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *storeRegion({ payload }, { call, put }) {
      const response = yield call(postRegion, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *coverRegion({ payload }, { call, put }) {
      const response = yield call(putRegion, payload);
      yield put({
        type: 'changeRegions',
        payload: response,
      });
    },
    *removeRegion({ payload }, { call, put }) {
      const response = yield call(deleteRegion, payload);
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
