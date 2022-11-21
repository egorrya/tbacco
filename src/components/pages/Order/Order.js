import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { order as orderCreators } from '../../../actions/actionCreators.js';
import AccountPage from '../../partials/AccountPage/AccountPage.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import routes from '../../../routes.js';
import { formatDate, formatPrice } from '../../utils.js';
import './order.scss';
import LinkButton from '../../elements/LinkButton/LinkButton.js';

const PAYMENT_TYPES = {
  cash: 'Наличные',
  transfer: 'Переводом на карту',
};

const PAYMENT_STATUSES = {
  new: 'Не оплачен',
  paid: 'Оплачен',
  rejected: 'Платеж отклонен',
};

const DELIVERY_TYPES = {
  pickup: 'Самовывоз',
  'moscow-courier': 'Курьером по Москве',
  'transport-company': 'Транспортными компаниями'
}

export default function Order() {
  const { id } = useParams();

  const selector = (state) => state.order;
  const { data: orderData } = useSelector(selector);

  const linkToProduct = (pid) => routes.product.to.replace(':id', pid);

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

  const payButton = () => {
    if (!orderData.payment) return null;
    if (orderData.payment.status !== 'new') return null;

    if (orderData.payment.type === 'transfer') {
      return (
        <LinkButton
          node={NavLink}
          to={'#'}
        >
          Оплатить
        </LinkButton>
      );
    }

    return null;
  };

  return (
    <TitledPage titleJsx={`Заказ #${orderData.number}`}>
      <AccountPage>
        <LoadablePage
          selector={selector}
          request={() => orderCreators.request(id)}
        >
          <div className="order">
            <div className="order__state">
              <div className="order__state__left">
                Статус заказа: {orderData.status}
              </div>
              <div className="order__state__right">
                Дата заказа: {formatDate(orderData.date_placed)}
              </div>
            </div>

            <div className="order__state">
              <div className="order__state__left">
                Способ оплаты: {PAYMENT_TYPES[orderData.payment?.type]}
              </div>
              <div className="order__state__right">
                Статус оплаты: {PAYMENT_STATUSES[orderData.payment?.status]}
                {payButton()}
              </div>
            </div>

            <div className="order__state">
              <div className="order__state__left">
                Способ доставки: {DELIVERY_TYPES[orderData.shipping_code]}
              </div>
            </div>

            <div className="order__positions">
              <table className="order__positions__table table-sm">
                <tbody>
                  {orderData.lines &&
                    orderData.lines.map((line) => (
                      <tr key={line.id}>
                        <td width="20%">{imgCell(line)}</td>
                        <td width="45%">{titleCell(line)}</td>
                        <td width="35%">
                          <div className="order__positions__table__price-qty">
                            <span>{line.quantity}</span>
                            <span>×</span>
                            <span>{formatPrice(line.unit_price_incl_tax)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <table className="order__positions__table table-md">
                <thead>
                  <tr>
                    <th colSpan={2}>Товары</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Всего</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.lines &&
                    orderData.lines.map((line) => (
                      <tr key={line.id}>
                        <td width="15%">{imgCell(line)}</td>
                        <td width="35%">{titleCell(line)}</td>
                        <td width="10%" className="text-center">
                          {line.quantity}
                        </td>
                        <td width="20%" className="text-center">
                          {formatPrice(line.unit_price_incl_tax)}
                        </td>
                        <td width="20%" className="text-center">
                          {formatPrice(line.line_price_incl_tax)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="order__shipping-cost">
              Стоимость доставки: {formatPrice(orderData.shipping_incl_tax)}
            </div>

            <div className="order__cost">
              Сумма заказа: {formatPrice(orderData.total_incl_tax)}
            </div>

            <div className="order__customer">
              <div className="order__customer__card">
                <div className="order__customer__card__title">Покупатель</div>
                <div className="order__customer__card__data">
                  <span>
                    {orderData.shipping_address &&
                      `${orderData.shipping_address.first_name} ${orderData.shipping_address.last_name}`}
                  </span>
                  <span>
                    {orderData.shipping_address &&
                      orderData.shipping_address.phone_number}
                  </span>
                </div>
              </div>

              <div className="order__customer__card">
                <div className="order__customer__card__title">
                  Адрес доставки
                </div>
                <div className="order__customer__card__data">
                  <span>
                    {orderData.shipping_address &&
                      `${orderData.shipping_address.postcode}, Россия,`}
                  </span>
                  <span>
                    {orderData.shipping_address &&
                      `г. ${orderData.shipping_address.line4},`}
                  </span>
                  <span>
                    {orderData.shipping_address &&
                      orderData.shipping_address.line1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </LoadablePage>
      </AccountPage>
    </TitledPage>
  );
}
