/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';

import routes from '../../../routes.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import AsideContent from '../AsideContent/AsideContent.js';
import CartLink from '../CartLink/CartLink.js';
import CustomerLink from '../CustomerLink/CustomerLink.js';
import Logo from '../Logo/Logo.js';

import './header.scss';

export default function Header() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const menuBurgerRef = useRef(null);
  const headerRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(menuBurgerRef.current?.checked);

  const onMobileNavItemClick = () => {
    menuBurgerRef.current.checked = false;
    setMenuOpened(false);
  };

  const onBurgerChanged = (event) => {
    setMenuOpened(event.target.checked);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpened ? 'hidden' : 'auto';
    if (menuOpened) {
      headerRef.current.classList.add('header-dark');
    } else {
      headerRef.current.classList.remove('header-dark');
    }
  }, [menuOpened]);

  return (
    <nav
      ref={headerRef}
      className={scroll ? 'header header--scroll' : 'header '}
    >
      <input
        type="checkbox"
        id="header-menu"
        className="header__menu-checkbox"
        ref={menuBurgerRef}
        onChange={onBurgerChanged}
      />
      <label htmlFor="header-menu" className="header__btn header__menu-btn">
        <div className="header__menu-btn__icon"></div>
      </label>

      <SoftLink
        className="header__btn header__logo-btn"
        to={routes.main.to}
        onClick={onMobileNavItemClick}
      >
        <Logo />
      </SoftLink>

      <div className="header__customer">
        <CartLink
          linkProps={{
            className: 'header__btn header__cart-btn',
            onClick: onMobileNavItemClick,
          }}
          imgProps={{ className: menuOpened ? 'filter-white' : '' }}
        />

        <CustomerLink
          linkProps={{
            className: 'header__btn header__cart-btn',
            onClick: onMobileNavItemClick,
          }}
          imgProps={{ className: menuOpened ? 'filter-white' : '' }}
        />
      </div>

      <div className="header__menu-container">
        <div className="header__menu-container__inner">
          <AsideContent customAction={onMobileNavItemClick} />
        </div>
      </div>
    </nav>
  );
}
