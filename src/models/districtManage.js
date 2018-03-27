/* eslint-disable keyword-spacing */
import { districtQuery, districtAdd, districtEdit, districtBatchDelete, districtDelete, districtRequireQuery, getBrand, getRegion } from '../services/sysSet';

export default {
  namespace: 'districtManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
    list: {
      results: [],
      count: 0,
    },
    regionsResults: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(districtQuery, payload);
      yield put({
        type: 'changeDistricts',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(districtAdd, payload);
      yield put({
        type: 'changeDistricts',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(districtEdit, payload);
      yield put({
        type: 'changeDistricts',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(districtDelete, payload);
      yield put({
        type: 'changeDistricts',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
      const response = yield call(districtBatchDelete, payload);
      yield put({
        type: 'changeDistricts',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(districtRequireQuery, payload);
      yield put({
        type: 'changeDistricts',
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
    *regionQuery({ payload }, { call, put }) {
      const response = yield call(getRegion, payload);
      yield put({
        type: 'regions',
        payload: response,
      });
    },
  },

  reducers: {
    changeDistricts(state, action) {
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
    regions(state, action) {
      return {
        ...state,
        regionsResults: action.payload,
      };
    },
  },
};
