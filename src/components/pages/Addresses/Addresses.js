import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import AccountPage from '../../partials/AccountPage/AccountPage.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import {
  addresses as addressesCreators,
  addressDelete as addressDeleteCreators,
} from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import images from '../../../images.js';
import './addresses.scss';

export default function Addresses() {
  const selector = (state) => state.addresses;
  const {
    data: { results: addressesData },
  } = useSelector(selector);
  const dispatch = useDispatch();

  const removeAddress = (id) => {
    dispatch(addressDeleteCreators.request(id));
  };

  return (
    <TitledPage titleJsx="Адреса доставки">
      <AccountPage>
        <LoadablePage selector={selector} request={addressesCreators.request}>
          <div className="addresses">
            {addressesData && addressesData.length === 0 && (
              <div className="addresses__empty">Нет сохраненных адресов</div>
            )}

            {addressesData && addressesData.length > 0 && (
              <div className="addresses__list">
                {addressesData.map((address) => (
                  <div key={address.id} className="addresses__list__item">
                    <div className="addresses__list__item__address">
                      <span>{address.postcode}, Россия,</span>
                      <span>{address.line4},</span>
                      <span>{address.line1}</span>
                    </div>
                    <div className="addresses__list__item__buttons">
                      <Link
                        className="addresses__list__item__buttons__button change-btn"
                        to={routes.address.to.replace(':id', address.id)}
                      >
                        <img
                          className="addresses__list__item__buttons__button__img"
                          src={images.penWhite}
                          alt=""
                        />
                        Изменить адрес
                      </Link>
                      <div
                        className="addresses__list__item__buttons__button remove-btn"
                        onClick={() => removeAddress(address.id)}
                      >
                        <img
                          className="addresses__list__item__buttons__button__img"
                          src={images.crossWhite}
                          alt=""
                        />
                        Удалить адрес
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </LoadablePage>
      </AccountPage>
    </TitledPage>
  );
}
