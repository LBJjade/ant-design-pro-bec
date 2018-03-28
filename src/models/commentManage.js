/* eslint-disable keyword-spacing,no-undef */
import { getComment, postComment, putComment, commentBatchDelete, deleteComment, commentRequireQuery, uploadLogo } from '../services/comment';

export default {
  namespace: 'commentManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    list: {
      results: [],
    },
  },

  effects: {
    *fetchComment({ payload }, { call, put }) {
      const response = yield call(getComment, payload);
      yield put({
        type: 'changeComments',
        payload: response,
      });
    },
    *storeComment({ payload }, { call }) {
      yield call(postComment, payload);
    },
    *coverComment({ payload }, { call }) {
      yield call(putComment, payload);
    },
    *removeComment({ payload }, { call }) {
      yield call(deleteComment, payload);
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(commentBatchDelete, payload);
      yield put({
        type: 'changeComments',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(commentRequireQuery, payload);
      yield put({
        type: 'changeComments',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changeComments',
        payload: response,
      });
    },
    *exisComments({ payload }, { call, put }) {
      const response = yield call(commentRequireQuery, payload);
      yield put({
        type: 'comments',
        payload: response,
      });
    },
    *exisCommentNos({ payload }, { call, put }) {
      const response = yield call(commentRequireQuery, payload);
      yield put({
        type: 'commentNos',
        payload: response,
      });
    },
  },

  reducers: {
    changeComments(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    comments(state, action) {
      return {
        ...state,
        comments: action.payload,
      };
    },
    commentNos(state, action) {
      return {
        ...state,
        commentNos: action.payload,
      };
    },
  },
};
