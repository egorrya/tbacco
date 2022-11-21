import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'slugify';
import {
  cart as cartCreators,
  productPreview as productPreviewCreators,
} from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import { formatPrice, showErrors } from '../../utils.js';
import ProductAdditionalPrices from '../ProductAdditionalPrices/ProductAdditionalPrices.js';
import './product-card.scss';

export default function ProductCard({
  data: { id, title, price, stockrecord, num_available, image, brand }, // eslint-disable-line camelcase
  categoryId,
}) {
  const url = routes.product.to
    .replace(':id', `${slugify(title).toLowerCase()}-${id}`)
    .replace(':cat', categoryId);
  const dispatch = useDispatch();
  const { errorLine } = useSelector((state) => state.cart);

  const onButtonClick = () => {
    dispatch(cartCreators.appendProductRequest({ id, quantity: 1 }));
  };

  const onPreviewOpen = () => {
    dispatch(productPreviewCreators.success({ id }));
  };

  return (
    <div className="product-card">
      <div className="product-card__img-container">
        <div
          onClick={onPreviewOpen}
          className="product-card__img-container__link"
        >
          <img src={image} />
        </div>
      </div>

      <p className="product-card__brand">
        {brand ? `Бренд: ${brand}` : 'Бренд: No Name'}
      </p>

      <SoftLink to={url} style={{ textDecoration: 'none' }}>
        <p className="product-card__title">{title}</p>
      </SoftLink>
      <p className="product-card__price">
        {formatPrice(price)}
        <ProductAdditionalPrices stockrecord={stockrecord} />
      </p>

      <div className="product-card__purchase">
        {num_available > 0 && ( // eslint-disable-line camelcase
          <button
            className="product-card__purchase__button"
            onClick={onButtonClick}
          >
            В корзину
          </button>
        )}
        <SoftLink to={url}>Подробнее</SoftLink>
      </div>
      <div>
        {errorLine &&
          showErrors(errorLine.response, {
            reason: {
              unknown_error: 'такое количество нельзя добавить в корзину',
            },
          })}
      </div>
    </div>
  );
}
