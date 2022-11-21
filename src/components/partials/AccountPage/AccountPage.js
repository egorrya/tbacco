import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutCreators } from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import images from '../../../images.js';
import './account-page.scss';

export default function AccountPage({ children }) {
  const dispatch = useDispatch();

  const navLinks = [
    { route: routes.profile, img: images.user, imgActive: images.userWhite },
    { route: routes.orders, img: images.cart, imgActive: images.cartWhite },
    { route: routes.addresses, img: images.map, imgActive: images.mapWhite },
    { route: routes.wishlist, img: images.heart, imgActive: images.heartWhite },
  ];

  const logout = (event) => {
    event.preventDefault();
    dispatch(logoutCreators.request());
  };

  return (
    <div className="account-page">
      <div className="account-page__nav">
        {navLinks.map((r) => (
          <Link
            key={r.route.to}
            className="account-page__nav__item"
            exact
            to={r.route.to}
          >
            <img
              className="account-page__nav__item__img icon-default"
              src={r.img}
              alt=""
            />
            <img
              className="account-page__nav__item__img icon-hover"
              src={r.imgActive}
              alt=""
            />
            {r.route.title}
          </Link>
        ))}
        <a className="account-page__nav__item" href="#" onClick={logout}>
          <img
            className="account-page__nav__item__img icon-default"
            src={images.logout}
            alt=""
          />
          <img
            className="account-page__nav__item__img icon-hover"
            src={images.logoutWhite}
            alt=""
          />
          Выйти
        </a>
      </div>

      <div className="account-page__content">{children}</div>
    </div>
  );
}
