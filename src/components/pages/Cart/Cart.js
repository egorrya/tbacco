import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { cart as cartCreators } from '../../../actions/actionCreators.js';
import images from '../../../images.js';
import routes from '../../../routes.js';
import LinkButton from '../../elements/LinkButton/LinkButton.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import SpinBox from '../../elements/SpinBox/SpinBox.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import ProductAdditionalPrices from '../../partials/ProductAdditionalPrices/ProductAdditionalPrices.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import { formatPrice } from '../../utils.js';

import './cart.scss';

export default function Cart() {
  const selector = (state) => state.cart;
  const { data: cartData } = useSelector(selector);
  const dispatch = useDispatch();

  const updateLineQuantity = (id, quantity, currentQty, limit) => {
    const actualQty = Math.max(1, Math.min(limit, quantity));
    const addQty = actualQty - currentQty;
    if (addQty === 0) return;

    dispatch(
      cartCreators.appendProductRequest({
        id,
        quantity: addQty,
      })
    );
  };

  const onDeleteLineClick = (id) =>
    dispatch(cartCreators.deleteLineRequest(id));

  const linkToProduct = (id) => routes.product.to.replace(':id', id);

  const imgCell = (line) => (
    <div className="cart__info__table__img">
      <SoftLink to={linkToProduct(line.product.id)}>
        <img src={line.product.image} />
      </SoftLink>
    </div>
  );

  const titleCell = (line) => (
    <SoftLink to={linkToProduct(line.product.id)}>
      {line.product.title}
    </SoftLink>
  );

  const spinboxPartialCell = (line) => (
    <SpinBox
      containerClassName="cart__info__table__price-qty__spinbox"
      value={line.quantity}
      onDecrease={() =>
        updateLineQuantity(
          line.product.id,
          line.quantity - 1,
          line.quantity,
          line.product.num_available
        )
      }
      onIncrease={() =>
        updateLineQuantity(
          line.product.id,
          line.quantity + 1,
          line.quantity,
          line.product.num_available
        )
      }
      onChange={(e) =>
        updateLineQuantity(
          line.product.id,
          e.target.value,
          line.quantity,
          line.product.num_available
        )
      }
    />
  );

  const deleteCell = (line) => (
    <button
      className="cart__info__table__delete-line"
      onClick={() => onDeleteLineClick(line.id)}
    >
      <img
        className="cart__info__table__delete-line__icon icon-default"
        alt="удалить"
        src={images.crossGray}
      />
    </button>
  );

  return (
    <TitledPage titleJsx="Корзина">
      <LoadablePage selector={selector} request={cartCreators.request}>
        <div className="cart">
          {cartData.lines && cartData.lines.length === 0 && (
            <div className="cart__empty">Корзина пуста</div>
          )}
          {cartData.lines && cartData.lines.length > 0 && (
            <>
              <div className="cart__info">
                <table className="cart__info__table table-sm">
                  <tbody>
                    {cartData.lines.map((line) => (
                      <tr key={line.id}>
                        <td width="20%">{imgCell(line)}</td>

                        <td width="50%">{titleCell(line)}</td>

                        <td width="20%">
                          <div className="cart__info__table__price-qty">
                            {formatPrice(line.price_incl_tax)}
                            {spinboxPartialCell(line)}
                          </div>
                        </td>

                        <td width="10%">{deleteCell(line)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="cart__info__table table-md">
                  <thead>
                    <tr>
                      <th colSpan={2}>Товары</th>
                      <th>Количество</th>
                      <th>Цена</th>
                      <th>Всего</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.lines.map((line) => (
                      <tr key={line.id}>
                        <td width="10%">{imgCell(line)}</td>

                        <td width="40%">{titleCell(line)}</td>

                        <td width="15%">
                          <div className="cart__info__table__price-qty">
                            {spinboxPartialCell(line)}
                          </div>
                        </td>

                        <td width="15%">
                          <div className="cart__info__table__price">
                            {formatPrice(line.unit_effective_price)}
                            <ProductAdditionalPrices
                              id={line.product.id}
                              stockrecord={line.product.stockrecord}
                            />
                          </div>
                        </td>

                        <td width="15%">
                          <div className="cart__info__table__price-qty">
                            {formatPrice(line.price_incl_tax)}
                          </div>
                        </td>

                        <td width="5%">{deleteCell(line)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="cart__info__summary">
                  <div className="cart__info__summary__price">
                    <div className="cart__info__summary__price__title">
                      Сумма заказа
                    </div>
                    <div className="cart__info__summary__price__value">
                      {formatPrice(cartData.total_incl_tax)}
                    </div>
                  </div>

                  <div className="cart__info__summary__description">
                    Стоимость доставки будет рассчитана на следующем шаге.
                  </div>
                </div>
              </div>

              <div className="cart__purchase">
                <LinkButton node={NavLink} to={routes.checkout.to}>
                  Оформить заказ
                </LinkButton>
              </div>
            </>
          )}
        </div>
      </LoadablePage>
    </TitledPage>
  );
}
