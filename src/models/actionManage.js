/* eslint-disable keyword-spacing,no-undef,no-unused-vars,no-unreachable,arrow-parens,object-shorthand,max-len */
import { Message } from 'antd';
import { getAction, postAction, putAction, actionBatchDelete, deleteAction, actionRequireQuery, uploadLogo } from '../services/action';

export default {
  namespace: 'actionManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    list: {
      results: [],
    },
    actions: [],
    actionNos: [],
    newdata: {
      results: [],
    },
  },

  effects: {
    *fetchAction({ payload }, { call, put }) {
      const response = yield call(getAction, payload);
      yield put({
        type: 'changeActions',
        payload: response,
      });
    },
    *storeAction({ payload }, { call, put }) {
      const response = yield call(postAction, payload);
      yield put({
        type: 'appendActions',
        payload: { results: [Object.assign(payload, response)] },
      });
      Message.success('新增成功');
    },
    *coverAction({ payload }, { call, put }) {
      const response = yield call(putAction, payload);
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
    *removeAction({ payload }, { call, put }) {
      const response = yield call(deleteAction, payload);
      if(JSON.parse(response).error === undefined) {
        Message.success('删除成功');
      }else{
        Message.error('删除失败');
      }
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(actionBatchDelete, payload);
      yield put({
        type: 'changeActions',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(actionRequireQuery, payload);
      yield put({
        type: 'changeActions',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changeActions',
        payload: response,
      });
    },
    *exisActions({ payload }, { call, put }) {
      const response = yield call(actionRequireQuery, payload);
      yield put({
        type: 'actions',
        payload: response,
      });
    },
    *exisActionNos({ payload }, { call, put }) {
      const response = yield call(actionRequireQuery, payload);
      yield put({
        type: 'actionNos',
        payload: response,
      });
    },
  },

  reducers: {
    changeActions(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    appendActions(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.concat(action.payload.results),
          count: state.data.count + 1,
        },
      };
    },
    resetActions(state, action) {
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
    clearActions(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.filter(item => item.objectId !== action.payload),
          count: state.data.count - 1,
        },
      };
    },
    actions(state, action) {
      return {
        ...state,
        actions: action.payload,
      };
    },
    actionNos(state, action) {
      return {
        ...state,
        actionNos: action.payload,
      };
    },
  },
};
