

export default {

    namespace: 'login',
  
    state: {
        loginStatus: false,
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *toLogin({ payload }, { call, put }) {  // eslint-disable-line
        const { status } =  payload ;
        yield put({ type: 'save' ,payload:{ loginStatus: status }});
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  