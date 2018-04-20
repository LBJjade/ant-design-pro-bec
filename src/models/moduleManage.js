/* eslint-disable keyword-spacing,no-undef,no-unused-vars,no-unreachable,arrow-parens,object-shorthand,max-len */
import { Message } from 'antd';
import { getModule, postModule, putModule, moduleBatchDelete, deleteModule, moduleRequireQuery, uploadLogo } from '../services/module';

export default {
  namespace: 'moduleManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    list: {
      results: [],
    },
    modules: [],
    moduleNos: [],
    newdata: {
      results: [],
    },
  },

  effects: {
    *fetchModule({ payload }, { call, put }) {
      const response = yield call(getModule, payload);
      yield put({
        type: 'changeModules',
        payload: response,
      });
    },
    *storeModule({ payload }, { call, put }) {
      const response = yield call(postModule, payload);
      yield put({
        type: 'appendModules',
        payload: { results: [Object.assign(payload, response)] },
      });
      Message.success('新增成功');
    },
    *coverModule({ payload }, { call, put }) {
      const response = yield call(putModule, payload);
      if(response !== undefined) {
        if(JSON.parse(response).error === undefined) {
          Message.success('编辑成功');
        }else{
          Message.error('编辑失败');
        }
      }else{
        Message.success('编辑成功');
      }
    },
    *removeModule({ payload }, { call, put }) {
      const response = yield call(deleteModule, payload);
      if(JSON.parse(response).error === undefined) {
        Message.success('删除成功');
      }else{
        Message.error('删除失败');
      }
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(moduleBatchDelete, payload);
      yield put({
        type: 'changeModules',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(moduleRequireQuery, payload);
      yield put({
        type: 'changeModules',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changeModules',
        payload: response,
      });
    },
    *exisModules({ payload }, { call, put }) {
      const response = yield call(moduleRequireQuery, payload);
      yield put({
        type: 'modules',
        payload: response,
      });
    },
    *exisModuleNos({ payload }, { call, put }) {
      const response = yield call(moduleRequireQuery, payload);
      yield put({
        type: 'moduleNos',
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
    appendModules(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.concat(action.payload.results),
          count: state.data.count + 1,
        },
      };
    },
    resetModules(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.map(item => {
            if (item.objectId === action.payload.ojId) {
              return action.payload;
            } else {
              return item;
            }
          }),
          count: state.data.count,
        },
      };
    },
    clearModules(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.filter(item => item.objectId !== action.payload),
          count: state.data.count - 1,
        },
      };
    },
    modules(state, action) {
      return {
        ...state,
        modules: action.payload,
      };
    },
    moduleNos(state, action) {
      return {
        ...state,
        moduleNos: action.payload,
      };
    },
  },
};
