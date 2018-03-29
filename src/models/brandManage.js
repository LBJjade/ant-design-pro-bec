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
    brandNos: [],
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
        type: 'appendBrands',
        payload: response,
      });
    },
    *coverBrand({ payload }, { call, put }) {
      const response = yield call(putBrand, payload);
      yield put({
        type: 'resetBrands',
        payload: response,
      });
    },
    *removeBrand({ payload }, { call, put }) {
      const response = yield call(deleteBrand, payload);
      yield put({
        type: 'clearBrands',
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
    *exisBrands({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'brands',
        payload: response,
      });
    },
    *exisBrandNos({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'brandNos',
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
    appendBrands(state) {
      return {
        ...state,
        data: action.payload,
      };
    },
    resetBrands(state) {
      return {
        ...state,
        data: action.payload,
      };
    },
    clearBrands(state) {
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
    brandNos(state, action) {
      return {
        ...state,
        brandNos: action.payload,
      };
    },
  },
};
