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
    brands: [],
  },

  effects: {
    *fetchBrand({ payload }, { call, put }) {
      const response = yield call(getBrand, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *storeBrand({ payload }, { call }) {
      yield call(postBrand, payload);
    },
    *coverBrand({ payload }, { call }) {
      yield call(putBrand, payload);
    },
    *removeBrand({ payload }, { call }) {
      yield call(deleteBrand, payload);
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
    *exisBrands({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'brands',
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
    brands(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
  },
};
