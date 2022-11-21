export function simpleActionTypesFactory(basename) {
  return {
    request: `${basename}_REQUEST`,
    success: `${basename}_SUCCESS`,
    failure: `${basename}_FAILURE`,
    clear: `${basename}_CLEAR`,
  };
}

export function simpleActionCreatorsFactory({
  request,
  success,
  failure,
  clear,
}) {
  return {
    request: (payload) => ({ type: request, payload }),
    success: (data) => ({ type: success, payload: { data } }),
    error: (error) => ({ type: failure, payload: { error } }),
    clear: () => ({ type: clear }),
  };
}
