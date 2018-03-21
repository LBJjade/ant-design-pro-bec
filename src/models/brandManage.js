/* eslint-disable keyword-spacing,no-undef */
import { brandQuery, brandAdd, brandEdit, brandBatchDelete, brandDelete, brandRequireQuery, uploadLogo } from '../services/sysSet';

export default {
  namespace: 'brandManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
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
        type: 'addBrands',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(brandEdit, payload);
      yield put({
        type: 'editBrands',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(brandDelete, payload);
      yield put({
        type: 'deleteBrands',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
      const response = yield call(brandBatchDelete, payload);
      yield put({
        type: 'deleteBrands',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'queryResult',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'uploadResult',
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
  addBrands(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editBrands(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  deleteBrands(state, action) {
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
  uploadResult(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
