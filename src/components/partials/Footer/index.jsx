import React from 'react';
import images from '../../../images.js';
import routes from '../../../routes.js';
import Link from '../../elements/Link/Link.js';
import LinkRel from '../../elements/LinkRel/LinkRel.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import AsideContent from '../AsideContent/AsideContent.js';

import { motion } from 'framer-motion';
import './footer.scss';

export default function PageContainerWithAside({ children, customAction }) {
  const performCustomAction = () => {
    if (customAction) customAction();
  };

  const isActiveLink = (lid) => {
    if (typeof lid === 'number') {
      return categories.includes(lid.toString());
    }
    return location.pathname === lid;
  };

  let currentDate = new Date();
  let year = currentDate.getFullYear();

  const tbaccoLinks = [
    routes.about,
    routes.contact,
    routes.delivery_payment,
    routes.return_exchange,
    routes.warranty,
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
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: `1`,
      }}
      className="footer"
    >
      <div className="container">
        <div className="aside-content__footer footer__top">
          <div>
            {tbaccoLinks.length && (
              <div className="aside-content__panel__categories__primary">
                <p className="aside-content__panel__categories__primary__title">
                  Меню
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
          </div>

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
            <div className="aside-content__footer__external">
              <div className="aside-content__footer__external__app-store desktop-disable">
                <LinkRel
                  className="aside-content__footer__external__app-store__card"
                  href="#"
                  target="_blank"
                >
                  <img src={images.appStore} />
                </LinkRel>
              </div>

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
          </div>
        </div>

        <div className="aside-content__footer">
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
    </motion.footer>
  );
}
