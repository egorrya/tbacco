import { throwError, range, zip, timer, of } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import {
  concatMap,
  map,
  retryWhen,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getToken, removeToken } from '../token.js';

export function RetryStrategyFactory({
  count = 3,
  delay = 1000,
  raiseErrorImmediately = [],
  errorMsg = null,
}) {
  return (attempts) =>
    zip(attempts, range(1, count + 1)).pipe(
      concatMap(([error, i]) => {
        if (raiseErrorImmediately.includes(error.status) || i > count) {
          return throwError(
            errorMsg ? new AjaxError(errorMsg, error.xhr, error.request) : error
          );
        }

        return timer(delay);
      })
    );
}

export function tokenHeaders() {
  const token = getToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

export function jsonHeaders() {
  return { 'Content-Type': 'application/json' };
}

export function apiHeaders() {
  return {
    ...jsonHeaders(),
    ...tokenHeaders(),
  };
}

export function simpleEpicFactory(
  actionTypes,
  actionCreators,
  request,
  retryMessage = null,
  raiseErrorImmediately = [401]
) {
  return (action$) =>
    action$.pipe(
      ofType(actionTypes.request),
      map((o) => o.payload),
      switchMap((payload) =>
        request(payload).pipe(
          map((data) => actionCreators.success(data.response)),
          retryWhen(
            RetryStrategyFactory({
              errorMsg: retryMessage,
              raiseErrorImmediately,
            })
          ),
          catchError((error) => {
            if (
              error.status === 401 &&
              Array.isArray(error.response) &&
              error.response.filter((e) => e.code === 'authentication_failed')
                .length > 0
            ) {
              removeToken();
            }
            return of(actionCreators.error(error));
          })
        )
      )
    );
}
