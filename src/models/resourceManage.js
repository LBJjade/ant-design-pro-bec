/* eslint-disable keyword-spacing */
import { getSource, addResource, resourceEdit, resourceBatchDelete, resourceDelete, resourceRequireQuery } from '../services/module';

export default {
  namespace: 'resourceManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getSource, payload);
      yield put({
        type: 'changeResources',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addResource, payload);
      yield put({
        type: 'addResources',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(resourceEdit, payload);
      yield put({
        type: 'editResources',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(resourceDelete, payload);
      yield put({
        type: 'deleteResources',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
      const response = yield call(resourceBatchDelete, payload);
      yield put({
        type: 'deleteResources',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(resourceRequireQuery, payload);
      yield put({
        type: 'queryResult',
        payload: response,
      });
    },
  },

  reducers: {
    changeResources(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addResources(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editResources(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  deleteResources(state, action) {
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
