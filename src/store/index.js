import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

import * as actionTypes from '../actions/actionTypes.js';
import * as actionCreators from '../actions/actionCreators.js';

import { simpleReducerFactory } from '../reducers/utils.js';
import cartReducer from '../reducers/cartReducer.js';

import { apiHeaders, jsonHeaders, simpleEpicFactory } from '../epics/utils.js';
import {
  registerSuccessEpic,
  loginSuccessEpic,
  logoutEpic,
  profileUpdateSuccessEpic,
  cartAppendProductRequestEpic,
  cartDeleteLineRequestEpic,
  cartErrorLineEpic,
  deliveryCostSuccessEpic,
  checkoutSuccessEpic,
  addressDeleteSuccessEpic,
  changeWishlistEpic,
  wishlistErrorLineEpic,
} from '../epics/customEpics.js';

const reducer = combineReducers({
  staticPage: simpleReducerFactory(actionTypes.staticPage),
  register: simpleReducerFactory(actionTypes.register),
  registerVerify: simpleReducerFactory(actionTypes.registerVerify),
  login: simpleReducerFactory(actionTypes.login),
  logout: simpleReducerFactory(actionTypes.logout),
  profile: simpleReducerFactory(actionTypes.profile),
  profileUpdate: simpleReducerFactory(actionTypes.profileUpdate),
  passwordChange: simpleReducerFactory(actionTypes.passwordChange),
  passwordReset: simpleReducerFactory(actionTypes.passwordReset),
  passwordResetVerify: simpleReducerFactory(actionTypes.passwordResetVerify),
  topCategories: simpleReducerFactory(actionTypes.topCategories),
  topProducts: simpleReducerFactory(actionTypes.topProducts),
  catalogItems: simpleReducerFactory(actionTypes.catalogItems),
  product: simpleReducerFactory(actionTypes.product),
  productPreview: simpleReducerFactory(actionTypes.productPreview),
  cart: cartReducer,
  deliveryTypes: simpleReducerFactory(actionTypes.deliveryTypes),
  deliveryCost: simpleReducerFactory(actionTypes.deliveryCost),
  checkout: simpleReducerFactory(actionTypes.checkout),
  orders: simpleReducerFactory(actionTypes.orders),
  order: simpleReducerFactory(actionTypes.order),
  addresses: simpleReducerFactory(actionTypes.addresses),
  address: simpleReducerFactory(actionTypes.address),
  addressDelete: simpleReducerFactory(actionTypes.addressDelete),
  addressUpdate: simpleReducerFactory(actionTypes.addressUpdate),
  wishlist: simpleReducerFactory(actionTypes.wishlist),
  wishlistAdd: simpleReducerFactory(actionTypes.wishlistAdd),
  wishlistDelete: simpleReducerFactory(actionTypes.wishlistDelete),
  availableFilters: simpleReducerFactory(actionTypes.availableFilters),
});

const epic = combineEpics(
  simpleEpicFactory(
    actionTypes.staticPage,
    actionCreators.staticPage,
    (pathname) =>
      ajax.get(
        `${process.env.API_ENDPOINT}/static-pages${pathname}/`,
        jsonHeaders()
      ),
    'не удалось загрузить информацию'
  ),
  simpleEpicFactory(
    actionTypes.register,
    actionCreators.register,
    (data) =>
      ajax.post(`${process.env.API_ENDPOINT}/register/`, data, jsonHeaders()),
    'не удалось зарегистрироваться'
  ),
  registerSuccessEpic,
  simpleEpicFactory(
    actionTypes.registerVerify,
    actionCreators.registerVerify,
    (data) =>
      ajax.post(
        `${process.env.API_ENDPOINT}/register/verify/`,
        data,
        jsonHeaders()
      ),
    'не удалось завершить регистрацию',
    [400]
  ),
  simpleEpicFactory(
    actionTypes.login,
    actionCreators.login,
    (data) =>
      ajax.post(`${process.env.API_ENDPOINT}/login/`, data, jsonHeaders()),
    'не удалось войти'
  ),
  loginSuccessEpic,
  logoutEpic,
  simpleEpicFactory(
    actionTypes.profile,
    actionCreators.profile,
    () => ajax.get(`${process.env.API_ENDPOINT}/profile/`, apiHeaders()),
    'не удалось получить информацию о профиле'
  ),
  simpleEpicFactory(
    actionTypes.profileUpdate,
    actionCreators.profileUpdate,
    (data) =>
      ajax.patch(`${process.env.API_ENDPOINT}/profile/`, data, apiHeaders()),
    'не удалось обновить профиль',
    [400, 401]
  ),
  profileUpdateSuccessEpic,
  simpleEpicFactory(
    actionTypes.passwordChange,
    actionCreators.passwordChange,
    (data) =>
      ajax.post(
        `${process.env.API_ENDPOINT}/profile/change-password/`,
        data,
        apiHeaders()
      ),
    'не удалось сменить пароль'
  ),
  simpleEpicFactory(
    actionTypes.passwordReset,
    actionCreators.passwordReset,
    (data) =>
      ajax.post(
        `${process.env.API_ENDPOINT}/profile/reset-password/`,
        data,
        jsonHeaders()
      ),
    'не удалось запустить процедуру восстановления пароля',
    [400, 429]
  ),
  simpleEpicFactory(
    actionTypes.passwordResetVerify,
    actionCreators.passwordResetVerify,
    (data) =>
      ajax.post(
        `${process.env.API_ENDPOINT}/profile/reset-password/verify/`,
        data,
        jsonHeaders()
      ),
    'не удалось завершить процедуру восстановления пароля',
    [400, 429]
  ),
  simpleEpicFactory(
    actionTypes.topCategories,
    actionCreators.topCategories,
    () => ajax.get(`${process.env.API_ENDPOINT}/categories/`, jsonHeaders()),
    'не удалось загрузить категории'
  ),
  simpleEpicFactory(
    actionTypes.topProducts,
    actionCreators.topProducts,
    () => ajax.get(`${process.env.API_ENDPOINT}/products/top/`, apiHeaders()),
    'не удалось загрузить популярные товары'
  ),
  simpleEpicFactory(
    actionTypes.catalogItems,
    actionCreators.catalogItems,
    (pageInfo) => {
      const params = pageInfo.toBackendUrlParams().toString();
      const url = `${process.env.API_ENDPOINT}/products/?${params}`;
      return ajax.get(url, apiHeaders());
    },
    'не удалось загрузить товары'
  ),
  simpleEpicFactory(
    actionTypes.product,
    actionCreators.product,
    (id) =>
      ajax.get(`${process.env.API_ENDPOINT}/products/${id}/`, apiHeaders()),
    'не удалось загрузить информацию о товаре'
  ),
  simpleEpicFactory(
    actionTypes.cart,
    actionCreators.cart,
    () =>
      ajax({
        method: 'GET',
        url: `${process.env.API_ENDPOINT}/basket/`,
        headers: apiHeaders(),
        withCredentials: true,
        responseType: 'json',
      }),
    'не удалось загрузить корзину'
  ),
  cartAppendProductRequestEpic,
  cartDeleteLineRequestEpic,
  cartErrorLineEpic,
  simpleEpicFactory(
    actionTypes.deliveryTypes,
    actionCreators.deliveryTypes,
    () =>
      ajax.get(
        `${process.env.API_ENDPOINT}/basket/shipping-methods/`,
        apiHeaders()
      ),
    'не удалось загрузить способы доставки'
  ),
  simpleEpicFactory(
    actionTypes.deliveryCost,
    actionCreators.deliveryCost,
    (data) =>
      ajax.post(
        `${process.env.API_ENDPOINT}/basket/shipping-methods/`,
        data,
        apiHeaders()
      ),
    'не удалось получить стоимость доставки',
    [401, 404, 406]
  ),
  deliveryCostSuccessEpic,
  simpleEpicFactory(
    actionTypes.checkout,
    actionCreators.checkout,
    (data) =>
      ajax.post(`${process.env.API_ENDPOINT}/checkout/`, data, apiHeaders()),
    'не удалось оформить заказ',
    [401, 406]
  ),
  checkoutSuccessEpic,
  simpleEpicFactory(
    actionTypes.orders,
    actionCreators.orders,
    () => ajax.get(`${process.env.API_ENDPOINT}/orders/`, apiHeaders()),
    'не удалось загрузить заказы'
  ),
  simpleEpicFactory(
    actionTypes.order,
    actionCreators.order,
    (id) => ajax.get(`${process.env.API_ENDPOINT}/orders/${id}/`, apiHeaders()),
    'не удалось загрузить информацию о заказе'
  ),
  simpleEpicFactory(
    actionTypes.addresses,
    actionCreators.addresses,
    () => ajax.get(`${process.env.API_ENDPOINT}/useraddresses/`, apiHeaders()),
    'не удалось загрузить адреса'
  ),
  simpleEpicFactory(
    actionTypes.address,
    actionCreators.address,
    (id) =>
      ajax.get(
        `${process.env.API_ENDPOINT}/useraddresses/${id}/`,
        apiHeaders()
      ),
    'не удалось загрузить адрес'
  ),
  simpleEpicFactory(
    actionTypes.addressDelete,
    actionCreators.addressDelete,
    (id) =>
      ajax.delete(
        `${process.env.API_ENDPOINT}/useraddresses/${id}/`,
        apiHeaders()
      ),
    'не удалось удалить адрес'
  ),
  addressDeleteSuccessEpic,
  simpleEpicFactory(
    actionTypes.addressUpdate,
    actionCreators.addressUpdate,
    ({ id, ...data }) =>
      ajax.patch(
        `${process.env.API_ENDPOINT}/useraddresses/${id}/`,
        data,
        apiHeaders()
      ),
    'не удалось обновить адрес'
  ),
  simpleEpicFactory(
    actionTypes.wishlist,
    actionCreators.wishlist,
    () => ajax.get(`${process.env.API_ENDPOINT}/wishlist/`, apiHeaders()),
    'не удалось загрузить список желаний'
  ),
  simpleEpicFactory(
    actionTypes.wishlistDelete,
    actionCreators.wishlistDelete,
    (id) =>
      ajax.delete(`${process.env.API_ENDPOINT}/wishlist/${id}/`, apiHeaders()),
    'не удалось удалить из списка желаний'
  ),
  simpleEpicFactory(
    actionTypes.wishlistAdd,
    actionCreators.wishlistAdd,
    (data) =>
      ajax.post(`${process.env.API_ENDPOINT}/wishlist/`, data, apiHeaders()),
    'не удалось добавить в список желаний'
  ),
  changeWishlistEpic,
  wishlistErrorLineEpic,
  simpleEpicFactory(
    actionTypes.availableFilters,
    actionCreators.availableFilters,
    (category) => {
      const params = category ? `?category=${category}` : '';
      return ajax.get(
        `${process.env.API_ENDPOINT}/products/filters/${params}`,
        apiHeaders()
      );
    },
    'не удалось получить фильтры'
  )
);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epic);

export default store;
