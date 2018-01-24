import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { postUsers, getUsers } from '../services/account';

export default {
  namespace: 'signup',

  state: {
    status: undefined,
    userValidating: [],
  },

  effects: {
    *submit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(postUsers, payload);
      yield put({
        type: 'signupHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response.error !== undefined) {
        message.success('注册成功！', 3);
        yield put(routerRedux.push('/account/login'));
      } else {
        message.error(`注册失败！${response.error}`, 3);
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
        status: payload.status,
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
