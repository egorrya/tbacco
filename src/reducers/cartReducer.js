import { cart as cartTypes } from '../actions/actionTypes.js';

const initialState = {
  data: {},
  loading: false,
  error: null,
  errorLine: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.request:
      return { ...state, loading: true, error: null };
    case cartTypes.failure: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case cartTypes.success:
    case cartTypes.appendProductSuccess:
    case cartTypes.deleteLineSuccess: {
      const { data } = action.payload;
      return {
        ...state,
        data,
        loading: false,
        error: null,
        errorLine: null,
      };
    }
    case cartTypes.appendProductRequest:
    case cartTypes.deleteLineRequest:
      return { ...state, errorLine: null };
    case cartTypes.appendProductFailure:
    case cartTypes.deleteLineFailure: {
      const { error } = action.payload;
      return { ...state, errorLine: error };
    }
    case cartTypes.clear:
      return { ...state, ...initialState };
    case cartTypes.errorLineClear:
      return { ...state, errorLine: null };
    default:
      return { ...state };
  }
}
