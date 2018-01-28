
export default {
  namespace: 'forgetpassword',
  state: {

  },

  effects: {
    // *submit({ payload }, { call, put }) {
    // },
  },

  reducers: {
    forgetpasswordHandle(state, { payload }) {
      return {
        ...state,
        res: payload,
      };
    },
  },
};
