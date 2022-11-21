import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountPage from '../../partials/AccountPage/AccountPage.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import {
  wishlist as wishlistCreators,
  wishlistDelete as wishlistDeleteCreators,
} from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import images from '../../../images.js';
import './wishlist.scss';

export default function Wishlist() {
  const selector = (state) => state.wishlist;
  const {
    data: { results: wishlistData },
  } = useSelector(selector);
  const dispatch = useDispatch();

  const onDeleteItem = (id) => {
    dispatch(wishlistDeleteCreators.request(id));
  };

  const linkToProduct = (id) => routes.product.to.replace(':id', id);

  return (
    <TitledPage titleJsx="Список желаний">
      <AccountPage>
        <LoadablePage selector={selector} request={wishlistCreators.request}>
          <div className="wishlist">
            {wishlistData && wishlistData.length === 0 && (
              <div className="wishlist__empty">Список желаний пуст</div>
            )}

            {wishlistData && wishlistData.length > 0 && (
              <div className="wishlist__list">
                {wishlistData.map((line) => (
                  <div key={line.id} className="wishlist__list__item">
                    <div className="wishlist__list__item__info">
                      <SoftLink to={linkToProduct(line.product.id)}>
                        <img src={line.product.image} />
                      </SoftLink>
                      <SoftLink
                        to={linkToProduct(line.product.id)}
                        className="custom-link wishlist__list__item__info__title"
                      >
                        {line.product.title}
                      </SoftLink>
                    </div>
                    <div
                      className="wishlist__list__item__delete"
                      onClick={() => onDeleteItem(line.id)}
                    >
                      <button className="wishlist__list__item__delete-line">
                        <img
                          className="icon-default"
                          alt=""
                          src={images.crossGray}
                        />
                        <img
                          className="icon-hover"
                          alt=""
                          src={images.crossYellow}
                        />
                      </button>
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
