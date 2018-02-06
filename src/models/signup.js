// import { routerRedux } from 'dva/router';
import { Message } from 'antd';
import { postUser, getUsers } from '../services/account';

export default {
  namespace: 'signup',

  state: {
    res: [],
    userValidating: [],
  },

  effects: {
    *submit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(postUser, payload);
      yield put({
        type: 'signupHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response.error !== undefined) {
        Message.error(`注册失败！${response.error}`, 3);
      }
    },
    *validate({ payload }, { call, put }) {
      const ret = yield call(getUsers, payload);
      yield put({
        type: 'changeValidating',
        payload: ret,
      });
    },
  },

  reducers: {
    signupHandle(state, { payload }) {
      return {
        ...state,
        res: payload,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    changeValidating(state, { payload }) {
      return {
        ...state,
        userValidating: payload,
      };
    },
  },
};
