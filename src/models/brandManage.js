/* eslint-disable keyword-spacing,no-undef */
import { brandQuery, brandAdd, brandEdit, brandBatchDelete, brandDelete, brandRequireQuery, uploadLogo, getBrandName } from '../services/sysSet';

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
        type: 'changeBrands',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(brandEdit, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(brandDelete, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
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
    *getBrand({ payload }, { call, put }) {
      const response = yield call(getBrandName, payload);
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
        list: action.payload.brandName,
      };
    },
  },
};
