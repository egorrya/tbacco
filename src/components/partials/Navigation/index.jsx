import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';
import slugify from 'slugify';
import { topCategories } from '../../../actions/actionCreators.js';
import useTimeout from '../../../hooks/useTimeout.js';
import routes from '../../../routes.js';
import Link from '../../elements/Link/Link.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import CartLink from '../CartLink/CartLink.js';
import CustomerLink from '../CustomerLink/CustomerLink.js';
import Logo from '../Logo/Logo.js';
import PageContainerWithAside from '../PageContainerWithAside/PageContainerWithAside.js';

import './style.scss';

export default function Navigation({ theme, customAction }) {
  const [scroll, setScroll] = useState(false);

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(false);

  const [visibleSubmenu, setVisibleSubmenu] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(false);

  useTimeout(
    () => setVisibleMenu(true),
    !visibleMenu && hoveredMenu ? 3000 : null
  );

  useTimeout(
    () => setVisibleSubmenu(true),
    !visibleSubmenu && hoveredSubmenu ? 3000 : null
  );

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const { data: topCategoriesData } = useSelector(
    (state) => state.topCategories
  );

  const dispatch = useDispatch();
  const location = useLocation();

  const categories = new URLSearchParams(location.search).getAll('category');

  const performCustomAction = () => {
    if (customAction) customAction();
  };

  const fetchTopCategories = () => {
    dispatch(topCategories.request());
  };

  const isActiveLink = (lid) => {
    if (typeof lid === 'number') {
      return categories.includes(lid.toString());
    }
    return location.pathname === lid;
  };

  const navLinks = [routes.about, routes.delivery_payment, routes.contact];

  return (
    <>
      <nav
        className={scroll ? 'page-nav page-nav--scroll' : `page-nav ${theme}`}
      >
        <a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
          }}
          href={routes.main.to}
          className="page-nav__logo"
        >
          <Logo />
        </a>
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
          }}
          className="page-nav__links"
        >
          <SoftLink
            onMouseEnter={() => setHoveredMenu(true)}
            onMouseLeave={() => setHoveredMenu(false)}
            onClick={() => setHoveredMenu(true)}
            className="page-nav__links__link"
            exact
            to={routes.catalog.to}
          >
            {routes.catalog.title}

            {topCategoriesData.results && hoveredMenu && (
              <div className="page-nav__submenu">
                {topCategoriesData.results.map((info) => (
                  <div key={info.id} className="page-nav__submenu__link">
                    <SoftLink
                      onMouseEnter={() => setHoveredSubmenu(info.id)}
                      onMouseLeave={() => setHoveredSubmenu(false)}
                      to={{
                        pathname: `${routes.catalog.to}/${slugify(
                          info.name
                        ).toLowerCase()}-${info.id}`,
                      }}
                      className={`aside-content__panel__categories__primary__link${
                        isActiveLink(info.id) ? ' link-active' : ''
                      }`}
                      // onClick={performCustomAction}
                    >
                      {info.name}
                    </SoftLink>

                    {info.children.length > 0 && info.id === hoveredSubmenu && (
                      <div
                        onMouseEnter={() => setHoveredSubmenu(info.id)}
                        className="page-nav__submenu__link__sublinks"
                      >
                        {info.children.map((child) => (
                          <SoftLink
                            key={child.id}
                            to={{
                              pathname: `${routes.catalog.to}/${slugify(
                                child.name
                              ).toLowerCase()}-${child.id}`,
                            }}
                            className={`aside-content__panel__categories__secondary${
                              isActiveLink(child.id) ? ' link-active' : ''
                            }`}
                            onClick={performCustomAction}
                          >
                            {child.name}
                          </SoftLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SoftLink>

          {navLinks.map((r) => (
            <SoftLink
              key={r.to}
              className="page-nav__links__link"
              exact
              to={r.to}
            >
              {r.title}
            </SoftLink>
          ))}
        </div>

        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.9,
          }}
          className="page-nav__customer"
        >
          <div className="page-nav__customer__phones">
            <Link href="tel:+7-495-128-61-19">+7 (495) 128-61-19</Link>
            <Link href="tel:+7-800-301-76-94">+7 (800) 301-76-94</Link>
          </div>
          <div className="page-nav__icons">
            <CartLink />
            <CustomerLink />
          </div>
        </div>
      </nav>
      <div className="page-nav__margin"></div>
    </>
  );
}
