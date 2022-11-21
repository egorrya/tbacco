import * as at from './actionTypes.js';
import { simpleActionCreatorsFactory } from './utils.js';

export const staticPage = simpleActionCreatorsFactory(at.staticPage);
export const register = simpleActionCreatorsFactory(at.register);
export const registerVerify = simpleActionCreatorsFactory(at.registerVerify);
export const login = simpleActionCreatorsFactory(at.login);
export const logout = simpleActionCreatorsFactory(at.logout);
export const profile = simpleActionCreatorsFactory(at.profile);
export const profileUpdate = simpleActionCreatorsFactory(at.profileUpdate);
export const passwordChange = simpleActionCreatorsFactory(at.passwordChange);
export const passwordReset = simpleActionCreatorsFactory(at.passwordReset);
export const passwordResetVerify = simpleActionCreatorsFactory(
  at.passwordResetVerify
);
export const topCategories = simpleActionCreatorsFactory(at.topCategories);
export const topProducts = simpleActionCreatorsFactory(at.topProducts);
export const catalogItems = {
  ...simpleActionCreatorsFactory(at.catalogItems),
  appendRequest: (payload) => ({
    type: at.catalogItems.appendRequest,
    payload,
  }),
  appendSuccess: (data) => ({
    type: at.catalogItems.appendSuccess,
    payload: { data },
  }),
  appendFailure: (error) => ({
    type: at.catalogItems.appendFailure,
    payload: { error },
  }),
};
export const product = simpleActionCreatorsFactory(at.product);
export const productPreview = simpleActionCreatorsFactory(at.productPreview);
export const cart = {
  ...simpleActionCreatorsFactory(at.cart),
  appendProductRequest: (payload) => ({
    type: at.cart.appendProductRequest,
    payload,
  }),
  appendProductSuccess: (data) => ({
    type: at.cart.appendProductSuccess,
    payload: { data },
  }),
  appendProductFailure: (error) => ({
    type: at.cart.appendProductFailure,
    payload: { error },
  }),
  deleteLineRequest: (payload) => ({
    type: at.cart.deleteLineRequest,
    payload,
  }),
  deleteLineSuccess: (data) => ({
    type: at.cart.deleteLineSuccess,
    payload: { data },
  }),
  deleteLineFailure: (error) => ({
    type: at.cart.deleteLineFailure,
    payload: { error },
  }),
  errorLineClear: () => ({
    type: at.cart.errorLineClear,
  }),
};
export const deliveryTypes = simpleActionCreatorsFactory(at.deliveryTypes);
export const deliveryCost = simpleActionCreatorsFactory(at.deliveryCost);
export const checkout = simpleActionCreatorsFactory(at.checkout);
export const orders = simpleActionCreatorsFactory(at.orders);
export const order = simpleActionCreatorsFactory(at.order);
export const addresses = simpleActionCreatorsFactory(at.addresses);
export const address = simpleActionCreatorsFactory(at.address);
export const addressDelete = simpleActionCreatorsFactory(at.addressDelete);
export const addressUpdate = simpleActionCreatorsFactory(at.addressUpdate);
export const wishlist = simpleActionCreatorsFactory(at.wishlist);
export const wishlistAdd = simpleActionCreatorsFactory(at.wishlistAdd);
export const wishlistDelete = simpleActionCreatorsFactory(at.wishlistDelete);
export const availableFilters = simpleActionCreatorsFactory(
  at.availableFilters
);
