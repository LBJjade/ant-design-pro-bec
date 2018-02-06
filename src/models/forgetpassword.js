import { routerRedux } from 'dva/router';
import { Message } from 'antd';
import { getUsers, postUser, putUser, postPasswordReset } from '../services/account';

export default {
  namespace: 'forgetpassword',

  state: {
    userValidating: [],
    email: '',
  },

  effects: {
    *validate({ payload }, { call, put }) {
      const ret = yield call(getUsers, payload);
      yield put({
        type: 'changeValidating',
        payload: ret,
      });
    },

    *submitEmail({ payload }, { call, put }) {
      yield put({ type: 'saveStepFormData', payload });
      yield put({ type: 'changeSubmitting', payload: true });
      const resUser = yield call(getUsers, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (resUser.error !== undefined) {
        Message.error(`帐户邮箱不存在。${resUser.error}`, 3);
      } else {
        yield put({ type: 'changeSubmitting', payload: true });
        yield call(postPasswordReset, payload);
        yield put({ type: 'changeSubmitting', payload: false });
        Message.success('已发送请求重置密码邮件至帐户邮箱，请开启邮箱进行激活。', 5);
      }
    },
    *submitPasswordReset({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const resUser = yield call(getUsers, { objectId: payload.objectid });
      yield put({ type: 'changeSubmitting', payload: false });
      if (resUser.error !== undefined) {
        Message.error(`帐户邮箱不存在。${resUser.error}`, 3);
      } else {
        yield put({ type: 'changeSubmitting', payload: true });
        const ret = yield call(putUser, payload);
        yield put({ type: 'changeSubmitting', payload: false });
        if (ret.error === undefined) {
          Message.success('密码重置成功！', 5);
        } else {
          Message.error(`密码重置失败！${ret.error}`, 5);
        }
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
        payload,
      };
    },
  },
};
