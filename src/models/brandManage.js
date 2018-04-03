/* eslint-disable keyword-spacing,no-undef,no-unused-vars,no-unreachable,arrow-parens,object-shorthand,max-len */
import { Message } from 'antd';
import { getBrand, postBrand, putBrand, brandBatchDelete, deleteBrand, brandRequireQuery, uploadLogo } from '../services/sysSet';

export default {
  namespace: 'brandManage',

  state: {
    data: {
      results: [],
      count: 0,
      state: [],
    },
    list: {
      results: [],
    },
    brands: [],
    brandNos: [],
    newdata: {
      results: [],
    },
  },

  effects: {
    *fetchBrand({ payload }, { call, put }) {
      const response = yield call(getBrand, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *storeBrand({ payload }, { call, put }) {
      const response = yield call(postBrand, payload);
      yield put({
        type: 'appendBrands',
        payload: { data: payload, object: response },
      });
      Message.success('新增成功');
    },
    *coverBrand({ payload }, { call, put }) {
      const response = yield call(putBrand, payload);
      if(response !== undefined) {
        if(JSON.parse(response).error === undefined) {
          yield put({
            type: 'resetBrands',
            payload: response,
          });
          Message.success('编辑成功');
        }else{
          yield put({
            type: 'resetBrands',
            payload: response,
          });
          Message.error('编辑失败');
        }
      }else{
        yield put({
          type: 'resetBrands',
        });
        Message.success('编辑成功');
      }
    },
    *removeBrand({ payload }, { call, put }) {
      const response = yield call(deleteBrand, payload);
      if(JSON.parse(response).error === undefined) {
        yield put({
          type: 'clearBrands',
          payload: response,
        });
        Message.success('删除成功');
      }else{
        yield put({
          type: 'clearBrands',
          payload: response,
        });
        Message.error('删除失败');
      }
    },
    *batchRemoveDelete({ payload }, { call, put }) {
      const response = yield call(brandBatchDelete, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *requireQuery({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadLogo, payload);
      yield put({
        type: 'changeBrands',
        payload: response,
      });
    },
    *exisBrands({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'brands',
        payload: response,
      });
    },
    *exisBrandNos({ payload }, { call, put }) {
      const response = yield call(brandRequireQuery, payload);
      yield put({
        type: 'brandNos',
        payload: response,
      });
    },
  },

  reducers: {
    changeBrands(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    appendBrands(state, action) {
      return {
        ...state,
        data: {
          results: state.data.results.map(item => {
            if (item.objectId === action.payload.objectId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        },
      };
    },
    resetBrands(state) {
      return {
        ...state,
      };
    },
    clearBrands(state, action) {
      return {
        ...state,
      };
    },
    brands(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
    brandNos(state, action) {
      return {
        ...state,
        brandNos: action.payload,
      };
    },
  },
};
