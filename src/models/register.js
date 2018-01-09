import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { accountRegister, queryUsers } from '../services/account';

export default {
  namespace: 'register',

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
      const response = yield call(accountRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      message.success('注册成功！', 3);
      yield put(routerRedux.push('/account/login'));
    },
    *validate({ payload }, { call, put }) {
      const ret = yield call(queryUsers, payload);
      yield put({
        type: 'changeValidating',
        payload: ret,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
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
