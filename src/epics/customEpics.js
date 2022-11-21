/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  delay,
  switchMap,
  concatMap,
  catchError,
  debounceTime,
} from 'rxjs/operators';
import { removeToken } from '../token.js';
import { apiHeaders } from './utils.js';
import * as at from '../actions/actionTypes.js';
import * as ac from '../actions/actionCreators.js';

export const registerSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.register.success),
    delay(1000 * 60 * 10), // 10 minutes
    map(() => ac.register.clear())
  );

export const loginSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.login.success),
    concatMap((o) => [
      ac.cart.request(),
      ac.registerVerify.clear(),
      ac.passwordResetVerify.clear(),
      ac.profile.success(o.payload.data),
    ])
  );

export const logoutEpic = (action$) =>
  action$.pipe(
    ofType(at.logout.request),
    switchMap(() =>
      ajax.delete(`${process.env.API_ENDPOINT}/login/`, apiHeaders()).pipe(
        concatMap(() => [
          ac.login.clear(),
          ac.profile.clear(),
          (() => {
            removeToken();
            return ac.logout.success();
          })(),
        ]),
        catchError((e) => of(ac.logout.error(e)))
      )
    )
  );

export const profileUpdateSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.profileUpdate.success),
    map((o) => ac.profile.success(o.payload.data))
  );

export const passwordResetSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.passwordReset.success),
    delay(1000 * 60 * 10), // 10 minutes
    map(() => ac.passwordReset.clear())
  );

export const cartAppendProductRequestEpic = (action$) =>
  action$.pipe(
    ofType(at.cart.appendProductRequest),
    // debounceTime(200),
    map((o) => o.payload),
    switchMap((payload) =>
      ajax({
        method: 'POST',
        url: `${process.env.API_ENDPOINT}/basket/add-product/`,
        body: payload,
        headers: apiHeaders(),
        withCredentials: true,
        responseType: 'json',
      }).pipe(
        map((data) => ac.cart.success(data.response)),
        catchError((e) => of(ac.cart.appendProductFailure(e)))
      )
    )
  );

export const cartDeleteLineRequestEpic = (action$) =>
  action$.pipe(
    ofType(at.cart.deleteLineRequest),
    map((o) => o.payload),
    switchMap((id) =>
      ajax({
        method: 'DELETE',
        url: `${process.env.API_ENDPOINT}/basket/lines/${id}/`,
        headers: apiHeaders(),
        withCredentials: true,
        responseType: 'json',
      }).pipe(
        map((data) => ac.cart.success(data.response)),
        catchError((e) => of(ac.cart.appendProductFailure(e)))
      )
    )
  );

export const cartErrorLineEpic = (action$) =>
  action$.pipe(
    ofType(at.cart.appendProductFailure, at.cart.deleteLineFailure),
    debounceTime(1000 * 3),
    map(() => ac.cart.errorLineClear())
  );

export const deliveryCostSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.deliveryCost.success),
    debounceTime(300),
    map((o) => ac.deliveryTypes.success(o.payload.data))
  );

export const checkoutSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.checkout.success),
    map(() => ac.cart.clear())
  );

export const addressDeleteSuccessEpic = (action$) =>
  action$.pipe(
    ofType(at.addressDelete.success),
    map(() => ac.addresses.request())
  );

export const changeWishlistEpic = (action$) =>
  action$.pipe(
    ofType(at.wishlistAdd.success, at.wishlistDelete.success),
    map(() => ac.wishlist.request())
  );

export const wishlistErrorLineEpic = (action$) =>
  action$.pipe(
    ofType(at.wishlistAdd.failure, at.wishlistDelete.failure),
    debounceTime(1000 * 5),
    concatMap(() => [ac.wishlistAdd.clear(), ac.wishlistDelete.clear()])
  );
