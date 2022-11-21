import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { orders as ordersCreators } from '../../../actions/actionCreators.js';
import AccountPage from '../../partials/AccountPage/AccountPage.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import routes from '../../../routes.js';
import { formatDate, formatPrice } from '../../utils.js';
import LinkButton from '../../elements/LinkButton/LinkButton.js';
import './orders.scss';

export default function Orders() {
  const selector = (state) => state.orders;
  const {
    data: { results: ordersData },
  } = useSelector(selector);

  const numberLink = (order) => (
    <SoftLink to={routes.order.to.replace(':id', order.id)}>
      #{order.number}
    </SoftLink>
  );

  return (
    <TitledPage titleJsx="История заказов">
      <AccountPage>
        <LoadablePage selector={selector} request={ordersCreators.request}>
          <div className="orders">
            {ordersData && ordersData.length === 0 && (
              <div className="orders__empty">
                Еще не сделано ни одного заказа
              </div>
            )}

            {ordersData && ordersData.length > 0 && (
              <>
                <table className="orders__table table-sm">
                  <tbody>
                    {ordersData.map((order) => (
                      <tr key={order.id}>
                        <td width="30%">{numberLink(order)}</td>

                        <td width="30%" className="orders__table__date-price">
                          <span>{formatDate(order.date_placed)}</span>
                          <span>
                            <b>{formatPrice(order.total_incl_tax)}</b>
                          </span>
                        </td>

                        <td width="40%">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="orders__table table-md">
                  <thead>
                    <tr>
                      <th>№ заказа</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                      <th>Статус</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData.map((order) => (
                      <tr key={order.id}>
                        <td width="25%">{numberLink(order)}</td>
                        <td width="15%">{formatDate(order.date_placed)}</td>
                        <td width="20%">{formatPrice(order.total_incl_tax)}</td>
                        <td width="30%">{order.status}</td>
                        <td width="10%">
                          <LinkButton
                            node={Link}
                            to={routes.order.to.replace(':id', order.id)}
                          >
                            Подробнее
                          </LinkButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </LoadablePage>
      </AccountPage>
    </TitledPage>
  );
}
