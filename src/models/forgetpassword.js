import { routerRedux } from 'dva/router';
import { Message } from 'antd';
import { getUsers, postUser, putUser } from '../services/account';

export default {
  namespace: 'forgetpassword',

  state: {
    step: {
      verify: 'email',
      email: 'hequnmin@gmail.com',
      mobile: '13927301011',
    },
    userValidating: [],
  },

  effects: {
    *validate({ payload }, { call, put }) {
      const ret = yield call(getUsers, payload);
      yield put({
        type: 'changeValidating',
        payload: ret,
      });
    },
    *submitVerifyCode({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const resUser = yield call(getUsers, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (resUser.error !== undefined) {
        Message.error(`发送验证码失败！用户邮箱或手机号码不存在。${resUser.error}`, 3);
      } else {
        const { objectId } = resUser.results;
        const { sessionToken } = resUser.results;
        const verifyCode = { verifyCode: '1234' };
        yield put({ type: 'changeSubmitting', payload: true });
        const response = yield call(putUser, objectId, sessionToken, verifyCode);
        yield put({ type: 'changeSubmitting', payload: false });
        if (response.error === undefined) {
          yield put({ type: 'saveStepFormData', payload });
          yield put(routerRedux.push('/account/forgetpassword/confirm'));
        } else {
          Message.error(`发送验证码失败！${response.error}`, 3);
        }
      }
    },
    *submitPasswordReset({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(postUser, payload);
      yield put({
        type: 'handleReset',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response.error !== undefined) {
        Message.error(`重置密码失败！${response.error}`, 3);
      }
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(postUser, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/account/forgetpassword/result'));
    },
  },

  reducers: {
    changeValidating(state, { payload }) {
      return {
        ...state,
        userValidating: payload,
      };
    },
    handleReset(state, { payload }) {
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
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
