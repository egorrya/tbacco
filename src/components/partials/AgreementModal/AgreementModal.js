import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckBox from '../../elements/CheckBox/CheckBox.js';
import Link from '../../elements/Link/Link.js';
import LinkRel from '../../elements/LinkRel/LinkRel.js';
import LinkButton from '../../elements/LinkButton/LinkButton.js';
import Button from '../../elements/Button/Button.js';
import routes from '../../../routes.js';
import './agreement-modal.scss';

export default function AgreementModal() {
  const publicUrls = [routes.agreement.to, routes.privacy.to, routes.terms.to];
  const location = useLocation();

  const needAgreement = () => {
    const agreement = localStorage.getItem('tbacco-agreement') || false;
    return !agreement && publicUrls.indexOf(location.pathname) === -1;
  };

  const [hasAgreement, setHasAgreement] = useState(!needAgreement());

  useEffect(() => {
    document.body.style.overflow = hasAgreement ? 'auto' : 'hidden';
  }, [hasAgreement]);

  useEffect(() => {
    setHasAgreement(!needAgreement());
  }, [location]);

  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('tbacco-agreement', 'yes');
    setHasAgreement(true);
  };

  return (
    <>
      <input
        type="checkbox"
        id="agreement-policy"
        aria-label="agreement-policy"
        checked={!hasAgreement}
        readOnly
      />

      <dialog className="agreement-policy">
        <div className="agreement-policy__panel">
          <p>
            Просмотр данного сайта разрешён только лицам, достигшим возраста 18
            лет. Нажав на кнопку «Да, мне исполнилось 18 лет», вы подтверждаете,
            что вам исполнилось 18 лет, принимаете условия{' '}
            <LinkRel href={routes.agreement.to} target="_blank">
              пользовательского соглашения
            </LinkRel>
            , даёте согласие на обработку <Link>Cookies</Link> (метаданных
            пользователя, IP-адресе и местоположении) и иных персональных
            данных.
          </p>
          <p>
            Дистанционная продажа, доставка табака и табачных изделий не
            осуществляется.
          </p>
          <p>
            Данный сайт не является рекламой и представляет собой каталог для
            ограниченного круга лиц (лиц старше 18 лет) для предоставления им
            достоверной информации об основных потребительских свойствах и
            качественных характеристик табачной продукции и аксессуарах для
            курения.
          </p>

          <form onSubmit={onSubmit}>
            <CheckBox id="agreement-policy-checkbox" required>
              <div>
                Я ознакомлен(-а) с{' '}
                <LinkRel href={routes.agreement.to} target="_blank">
                  пользовательским соглашением
                </LinkRel>
                , даю согласие на обработку моих персональных данных.
              </div>
            </CheckBox>

            <div className="agreement-policy__panel__buttons">
              <Button type="submit">Да, мне исполнилось 18 лет</Button>
              <LinkButton
                href={routes.agreement.to}
                rel="nofollow noopener noreferrer"
              >
                Нет, мне нет 18 лет
              </LinkButton>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
