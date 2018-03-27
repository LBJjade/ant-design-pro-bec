/* eslint-disable keyword-spacing,no-undef */
import { getBrand, postBrand, putBrand, brandBatchDelete, deleteBrand, brandRequireQuery, uploadLogo } from '../services/sysSet';

export default {
  namespace: 'brandManage',

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
    *fetchBrand({ payload }, { call, put }) {
      const response = yield call(getBrand, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *storeBrand({ payload }, { call, put }) {
      const response = yield call(postBrand, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *coverBrand({ payload }, { call, put }) {
      const response = yield call(putBrand, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *removeBrand({ payload }, { call, put }) {
      const response = yield call(deleteBrand, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(brandBatchDelete, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changeBrands',
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
};
