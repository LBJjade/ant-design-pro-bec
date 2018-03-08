import { districtQuery, districtAdd, districtEdit } from '../services/sysSet';

export default {
  namespace: 'districtManage',

  state: {
    data: {
      results: [],
      count: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(districtQuery, payload);
      yield put({
        type: 'changeDistricts',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(districtAdd, payload);
      yield put({
        type: 'addDistricts',
        payload: response,
      });
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(districtEdit, payload);
      yield put({
        type: 'editDistricts',
        payload: response,
      });
    },
  },

  reducers: {
    changeDistricts(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  addDistricts(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
  editDistricts(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
};
