/* eslint-disable max-len */
import {
  getIntention,
  getAnalysisField,
  getAnalysisRule,
  postAnalysisRule,
  putAnalysisRule,
  deleteAnalysisRule } from '../services/analysis';
import { Message } from 'antd';


export default {
  namespace: 'analysis',

  state: {
    loading: false,
    intention: {
      results: [],
    },
    analysisField: {
      results: [],
    },
    analysisRule: {
      results: [],
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getIntention);
      yield put({ type: 'changeIntention', payload: response, });
    },
    *fetchIntention({ payload }, { call, put }) {
      const response = yield call(getIntention, payload);
      yield put({ type: 'changeIntention', payload: response, });
    },
    *fetchAnalysisField({ payload }, { call, put }) {
      const resField = yield call(getAnalysisField, payload);
      yield put({ type: 'changeAnalysisField', payload: resField, });
    },
    *fetchAnalysisRule({ payload }, { call, put }) {
      const resRule = yield call(getAnalysisRule, payload);
      yield put({ type: 'changeAnalysisRule', payload: resRule, });
    },
    *storeAnalysisRule({ payload }, { call, put }) {
      const res = yield call(postAnalysisRule, payload);
      if (res.error === undefined) {
        yield put({ type: 'appendAnalysisRule', payload: { results: [Object.assign(payload, res)], }, });
        Message.success('保存成功！', 3);
      } else {
        Message.error(`保存失败！${res.error}`, 5);
      }
    },
    *coverAnalysisRule({ payload }, { call, put }) {
      const res = yield call(putAnalysisRule, payload);
      if (res.error === undefined) {
        yield put({ type: 'resetAnalysisRule', payload: payload, });
        Message.success('保存成功！', 3);
      } else {
        Message.error(`保存失败！${res.error}`, 5);
      }
    },
    *removeAnalysisRule({ payload }, { call, put }) {
      const res = yield call(deleteAnalysisRule, payload);
      if (res.error === undefined) {
        yield put({ type: 'clearAnalysisRule', payload: payload, });
        Message.success('删除成功！', 3);
      } else {
        Message.error(`删除失败！${res.error}`, 5);
      }
    },
  },

  reducers: {
    changeIntention(state, action) {
      return {
        ...state,
        intention: action.payload,
      };
    },
    changeAnalysisField(state, action) {
      return {
        ...state,
        analysisField: action.payload,
      };
    },
    changeAnalysisRule(state, action) {
      return {
        ...state,
        analysisRule: action.payload,
      };
    },
    appendAnalysisRule(state, action) {
      return {
        ...state,
        analysisRule: {
          results: state.analysisRule.results.concat(action.payload.results),
        },
      };
    },
    resetAnalysisRule(state, action) {
      return {
        ...state,
        analysisRule: {
          results: state.analysisRule.results.map(item => {
            if (item.objectId === action.payload.objectId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        },
      };
    },
    clearAnalysisRule(state, action) {
      return {
        ...state,
        analysisRule: {
          results: state.analysisRule.results.filter(item => item.objectId !== action.payload.objectId),
        },
      };
    },
  },
};
