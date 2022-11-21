import { simpleActionTypesFactory } from './utils.js';

export const staticPage = simpleActionTypesFactory('STATIC_PAGE');
export const register = simpleActionTypesFactory('REGISTER');
export const registerVerify = simpleActionTypesFactory('REGISTER_VERIFY');
export const login = simpleActionTypesFactory('LOGIN');
export const logout = simpleActionTypesFactory('LOGOUT');
export const profile = simpleActionTypesFactory('PROFILE');
export const profileUpdate = simpleActionTypesFactory('PROFILE_UPDATE');
export const passwordChange = simpleActionTypesFactory('PASSWORD_CHANGE');
export const passwordReset = simpleActionTypesFactory('PASSWORD_RESET');
export const passwordResetVerify = simpleActionTypesFactory(
  'PASSWORD_RESET_VERIFY'
);
export const topCategories = simpleActionTypesFactory('TOP_CATEGORIES');
export const topProducts = simpleActionTypesFactory('TOP_PRODUCTS');
export const catalogItems = {
  ...simpleActionTypesFactory('CATALOG_ITEMS'),
  appendRequest: 'CATALOG_ITEMS_APPEND_REQUEST',
  appendSuccess: 'CATALOG_ITEMS_APPEND_SUCCESS',
  appendFailure: 'CATALOG_ITEMS_APPEND_FAILURE',
};
export const product = simpleActionTypesFactory('PRODUCT');
export const productPreview = simpleActionTypesFactory('PRODUCT_PREVIEW');
export const cart = {
  ...simpleActionTypesFactory('CART'),
  appendProductRequest: 'CART_APPEND_PRODUCT_REQUEST',
  appendProductSuccess: 'CART_APPEND_PRODUCT_SUCCESS',
  appendProductFailure: 'CART_APPEND_PRODUCT_FAILURE',
  deleteLineRequest: 'CART_DELETE_LINE_REQUEST',
  deleteLineSuccess: 'CART_DELETE_LINE_SUCCESS',
  deleteLineFailure: 'CART_DELETE_LINE_FAILURE',
  errorLineClear: 'CART_ERROR_LINE_CLEAR',
};
export const deliveryTypes = simpleActionTypesFactory('DELIVERY_TYPES');
export const deliveryCost = simpleActionTypesFactory('DELIVERY_COST');
export const checkout = simpleActionTypesFactory('CHECKOUT');
export const orders = simpleActionTypesFactory('ORDERS');
export const order = simpleActionTypesFactory('ORDER');
export const addresses = simpleActionTypesFactory('ADDRESSES');
export const address = simpleActionTypesFactory('ADDRESS');
export const addressDelete = simpleActionTypesFactory('ADDRESS_DELETE');
export const addressUpdate = simpleActionTypesFactory('ADDRESS_UPDATE');
export const wishlist = simpleActionTypesFactory('WISHLIST');
export const wishlistAdd = simpleActionTypesFactory('WISHLIST_ADD');
export const wishlistDelete = simpleActionTypesFactory('WISHLIST_DELETE');
export const availableFilters = simpleActionTypesFactory('AVAILABLE_FILTERS');
