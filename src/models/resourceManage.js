/* eslint-disable keyword-spacing,no-undef,no-unused-vars,no-unreachable,arrow-parens,object-shorthand,max-len */
import { Message } from 'antd';
import { getResource, postResource, putResource, resourceBatchDelete, deleteResource, resourceRequireQuery, uploadLogo } from '../services/module';

export default {
  namespace: 'resourceManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    list: {
      results: [],
    },
    resources: [],
    resourceNos: [],
    newdata: {
      results: [],
    },
  },

  effects: {
    *fetchResource({ payload }, { call, put }) {
      const response = yield call(getResource, payload);
      yield put({
        type: 'changeResources',
        payload: response,
      });
    },
    *storeResource({ payload }, { call, put }) {
      const response = yield call(postResource, payload);
      yield put({
        type: 'appendResources',
        payload: { results: [Object.assign(payload, response)] },
      });
      Message.success('新增成功');
    },
    *coverResource({ payload }, { call, put }) {
      const response = yield call(putResource, payload);
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
    *removeResource({ payload }, { call, put }) {
      const response = yield call(deleteResource, payload);
      if(JSON.parse(response).error === undefined) {
        Message.success('删除成功');
      }else{
        Message.error('删除失败');
      }
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(resourceBatchDelete, payload);
      yield put({
        type: 'changeResources',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(resourceRequireQuery, payload);
      yield put({
        type: 'changeResources',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changeResources',
        payload: response,
      });
    },
    *exisResources({ payload }, { call, put }) {
      const response = yield call(resourceRequireQuery, payload);
      yield put({
        type: 'resources',
        payload: response,
      });
    },
    *exisResourceNos({ payload }, { call, put }) {
      const response = yield call(resourceRequireQuery, payload);
      yield put({
        type: 'resourceNos',
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
    appendResources(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.concat(action.payload.results),
          count: state.data.count + 1,
        },
      };
    },
    resetResources(state, action) {
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
    clearResources(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.filter(item => item.objectId !== action.payload),
          count: state.data.count - 1,
        },
      };
    },
    resources(state, action) {
      return {
        ...state,
        resources: action.payload,
      };
    },
    resourceNos(state, action) {
      return {
        ...state,
        resourceNos: action.payload,
      };
    },
  },
};
