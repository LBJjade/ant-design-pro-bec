/* eslint-disable keyword-spacing */
import { getModule, postModule, moduleEdit, moduleBatchDelete, moduleDelete, moduleRequireQuery } from '../services/module';

export default {
  namespace: 'moduleManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getModule, payload);
      yield put({
        type: 'changeModules',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(postModule, payload);
      yield put({
        type: 'addModules',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(moduleEdit, payload);
      yield put({
        type: 'editModules',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(moduleDelete, payload);
      yield put({
        type: 'deleteModules',
        payload: response,
      });
    },
    *batchDelete({ payload }, { call, put }) {
      const response = yield call(moduleBatchDelete, payload);
      yield put({
        type: 'deleteModules',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(moduleRequireQuery, payload);
      yield put({
        type: 'queryResult',
        payload: response,
      });
    },
  },

  reducers: {
    changeModules(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addModules(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editModules(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  deleteModules(state, action) {
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
