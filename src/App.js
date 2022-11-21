import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  cart as cartCreators,
  profile as profileCreators,
  topCategories as topCategoriesCreators,
} from './actions/actionCreators.js';

import Address from './components/pages/Address/Address.js';
import Addresses from './components/pages/Addresses/Addresses.js';
import Cart from './components/pages/Cart/Cart.js';
import Catalog from './components/pages/Catalog/Catalog.js';
import Checkout from './components/pages/Checkout/Checkout.js';
import Login from './components/pages/Login/Login.js';
import Main from './components/pages/Main/Main.js';
import Order from './components/pages/Order/Order.js';
import OrderPay from './components/pages/OrderPay/OrderPay.js';
import Orders from './components/pages/Orders/Orders.js';
import Page404 from './components/pages/Page404/Page404.js';
import PasswordReset from './components/pages/PasswordReset/PasswordReset.js';
import PasswordResetVerify from './components/pages/PasswordResetVerify/PasswordResetVerify.js';
import Product from './components/pages/Product/Product.js';
import Profile from './components/pages/Profile/Profile.js';
import Register from './components/pages/Register/Register.js';
import RegisterVerify from './components/pages/RegisterVerify/RegisterVerify.js';
import StaticPage from './components/pages/StaticPage/StaticPage.js';
import Wishlist from './components/pages/Wishlist/Wishlist.js';

import AgreementModal from './components/partials/AgreementModal/AgreementModal.js';
import Header from './components/partials/Header/Header.js';
import ProductPreview from './components/partials/ProductPreview/ProductPreview.js';
import TopScroller from './components/partials/TopScroller/TopScroller.js';

import routes from './routes.js';

import { AnimatePresence, motion } from 'framer-motion';
import './app.scss';

export default function App() {
  const staticRoutes = [
    routes.about,
    routes.agreement,
    routes.delivery_payment,
    routes.contact,
    routes.partnership_invite,
    routes.partnership_suppliers,
    routes.privacy,
    routes.return_exchange,
    routes.terms,
    routes.wholesale,
    routes.warranty,
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topCategoriesCreators.request());
    dispatch(profileCreators.request());
    dispatch(cartCreators.request());
  }, []);

  return (
    <Router>
      <TopScroller>
        <AgreementModal />
        <ProductPreview />
        <Header />{' '}
        <AnimatePresence>
          <main className="work-area">
            <Switch>
              {staticRoutes.map((r) => (
                <Route key={r.to} exact path={r.to} component={StaticPage} />
              ))}
              <Route exact path={routes.login.to} component={Login} />
              <Route exact path={routes.register.to} component={Register} />
              <Route
                exact
                path={routes.registerVerify.to}
                component={RegisterVerify}
              />
              <Route
                exact
                path={routes.passwordReset.to}
                component={PasswordReset}
              />
              <Route
                exact
                path={routes.passwordResetVerify.to}
                component={PasswordResetVerify}
              />
              <Route exact path={routes.main.to} component={Main} />
              <Route exact path={routes.profile.to} component={Profile} />
              <Route exact path={routes.orders.to} component={Orders} />
              <Route exact path={routes.order.to} component={Order} />
              <Route exact path={routes.orderPay.to} component={OrderPay} />
              <Route exact path={routes.addresses.to} component={Addresses} />
              <Route exact path={routes.address.to} component={Address} />
              <Route exact path={routes.wishlist.to} component={Wishlist} />
              <Route exact path={routes.catalog.to} component={Catalog} />
              <Route
                exact
                path={routes.catalogCategory.to}
                component={Catalog}
              />
              <Route exact path={routes.product.to} component={Product} />
              <Route exact path={routes.cart.to} component={Cart} />
              <Route exact path={routes.checkout.to} component={Checkout} />
              <Route path="*" component={Page404} />
            </Switch>
          </main>
        </AnimatePresence>
      </TopScroller>
    </Router>
  );
}
