/* eslint-disable import/prefer-default-export */
const initialState = {
  data: {},
  loading: false,
  error: null,
};

export function simpleReducerFactory({ request, success, failure, clear }) {
  return (state = initialState, action) => {
    switch (action.type) {
      case request:
        return { ...state, loading: true, error: null };
      case failure: {
        const { error } = action.payload;
        return { ...state, loading: false, error };
      }
      case success: {
        const { data } = action.payload;
        return {
          ...state,
          data,
          loading: false,
          error: null,
        };
      }
      case clear:
        return { ...state, ...initialState };
      default:
        return { ...state };
    }
  };
}
