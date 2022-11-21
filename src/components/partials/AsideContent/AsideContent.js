import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import slugify from 'slugify';
import { topCategories } from '../../../actions/actionCreators.js';
import images from '../../../images.js';
import routes from '../../../routes.js';
import Link from '../../elements/Link/Link.js';
import LinkRel from '../../elements/LinkRel/LinkRel.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import ErrorRetryBox from '../ErrorRetryBox/ErrorRetryBox.js';
import Loading from '../Loading/Loading.js';
import './aside-content.scss';

export default function AsideContent({ customAction }) {
  const {
    data: topCategoriesData,
    loading: topCategoriesLoading,
    error: topCategoriesError,
  } = useSelector((state) => state.topCategories);

  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setSearchValue(new URLSearchParams(location.search).get('q') || '');
  }, [location]);

  let currentDate = new Date();
  let year = currentDate.getFullYear();

  const fetchTopCategories = () => {
    dispatch(topCategories.request());
  };

  const performCustomAction = () => {
    if (customAction) customAction();
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    if (searchValue) {
      setSearchValue('');
      const params = new URLSearchParams({ q: searchValue }).toString();
      history.push(`${routes.catalog.to}?${params}`);
      performCustomAction();
    }
  };

  const handleSearchValueChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const categories = new URLSearchParams(location.search).getAll('category');
  const isActiveLink = (lid) => {
    if (typeof lid === 'number') {
      return categories.includes(lid.toString());
    }
    return location.pathname === lid;
  };

  const tbaccoLinks = [routes.about, routes.contact, routes.delivery_payment];
  const tbaccoSecondaryLinks = [routes.return_exchange, routes.warranty];
  const partnershipLinks = [
    routes.partnership_invite,
    routes.partnership_suppliers,
  ];
  const navSecondaryLinks = [routes.agreement, routes.privacy, routes.terms];
  const socialLinks = [
    {
      href: 'https://www.instagram.com/tbacco.ru/',
      src: images.instagram,
    },
    {
      href: 'https://vk.com/tbacco',
      src: images.vk,
    },
  ];

  return (
    <div className="aside-content">
      <div className="aside-content__panel">
        <form
          className="aside-content__panel__search"
          onSubmit={handleSubmitSearch}
        >
          <button className="aside-content__panel__search__submit">
            <svg
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="4.5" stroke="white" />
              <line x1="8.5" y1="8.5" x2="13" y2="13" stroke="white" />
            </svg>
          </button>
          <input
            className="aside-content__panel__search__q"
            type="text"
            placeholder="Поиск..."
            aria-label="q"
            onChange={handleSearchValueChange}
            value={searchValue}
          />
        </form>

        <div className="aside-content__panel__categories">
          {topCategoriesLoading && <Loading color="light" />}
          {topCategoriesError && (
            <ErrorRetryBox
              handleRetry={fetchTopCategories}
              msg={topCategoriesError.message}
            />
          )}
          {topCategoriesData.results &&
            topCategoriesData.results.map((info) => (
              <div
                key={info.id}
                className="aside-content__panel__categories__primary"
              >
                <SoftLink
                  to={{
                    pathname: `${routes.catalog.to}/${slugify(
                      info.name
                    ).toLowerCase()}-${info.id}`,
                  }}
                  className={`aside-content__panel__categories__primary__link${
                    isActiveLink(info.id) ? ' link-active' : ''
                  }`}
                  onClick={performCustomAction}
                >
                  {info.name}
                </SoftLink>

                {info.children.length > 0 && (
                  <Scrollbar>
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
                  </Scrollbar>
                )}
              </div>
            ))}

          {tbaccoLinks.length && (
            <div className="aside-content__panel__categories__primary spaced">
              <p className="aside-content__panel__categories__primary__title">
                TBACCO.RU
              </p>
              {tbaccoLinks.map((r) => (
                <SoftLink
                  key={r.to}
                  className={`aside-content__panel__categories__secondary${
                    isActiveLink(r.to) ? ' link-active' : ''
                  }`}
                  onClick={performCustomAction}
                  exact
                  to={r.to}
                  style={{ marginBottom: 0 }}
                >
                  {r.title}
                </SoftLink>
              ))}
            </div>
          )}

          {tbaccoSecondaryLinks.length &&
            tbaccoSecondaryLinks.map((r) => (
              <SoftLink
                key={r.to}
                className={`aside-content__panel__categories__primary__link${
                  isActiveLink(r.to) ? ' link-active' : ''
                }`}
                onClick={performCustomAction}
                exact
                to={r.to}
              >
                {r.title}
              </SoftLink>
            ))}

          {partnershipLinks.length && (
            <div className="aside-content__panel__categories__primary spaced">
              <p className="aside-content__panel__categories__primary__title">
                Сотрудничество
              </p>
              {partnershipLinks.map((r) => (
                <SoftLink
                  key={r.to}
                  className={`aside-content__panel__categories__secondary${
                    isActiveLink(r.to) ? ' link-active' : ''
                  }`}
                  onClick={performCustomAction}
                  exact
                  to={r.to}
                  style={{ marginBottom: 0 }}
                >
                  {r.title}
                </SoftLink>
              ))}
            </div>
          )}

          <div className="aside-content__panel__categories__primary">
            <p className="aside-content__panel__categories__primary__title">
              Мы на связи
            </p>
            <Link
              href="tel:+7-495-128-61-19"
              className="aside-content__panel__categories__secondary inverted"
            >
              +7 (495) 128-61-19
            </Link>
            <Link
              href="tel:+7-800-301-76-94"
              className="aside-content__panel__categories__secondary inverted"
            >
              +7 (800) 301-76-94
            </Link>
            <p className="aside-content__panel__categories__secondary__title">
              Режим работы: с 10:00 до 19:00
            </p>
          </div>
        </div>
      </div>

      <div className="aside-content__footer">
        <div className="aside-content__footer__external">
          {/* <div className="aside-content__footer__external__app-store desktop-disable">
            <LinkRel
              className="aside-content__footer__external__app-store__card"
              href="#"
              target="_blank"
            >
              <img src={images.appStore} />
            </LinkRel>
          </div> */}

          <div className="aside-content__footer__external__social">
            {socialLinks.map((info) => (
              <LinkRel
                key={info.href}
                className="aside-content__footer__external__social__card"
                href={info.href}
                target="_blank"
              >
                <img src={info.src} />
              </LinkRel>
            ))}
          </div>
        </div>

        <div className="aside-content__footer__links">
          {navSecondaryLinks.map((r) => (
            <SoftLink
              key={r.to}
              className="aside-content__footer__links__link"
              exact
              to={r.to}
              onClick={performCustomAction}
            >
              {r.title}
            </SoftLink>
          ))}
        </div>

        <div className="aside-content__footer__copyright">
          {year}, ООО «АРТ Тобакко».
          <br />
          Информация, представленная на сайте предназначена исключительно в
          ознакомительных целях и только для граждан старше 18 лет.
        </div>
      </div>
    </div>
  );
}
