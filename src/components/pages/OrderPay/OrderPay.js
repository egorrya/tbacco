import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import InputCard from '../../partials/InputCard/InputCard.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import RadioCheckBox from '../../elements/RadioCheckBox/RadioCheckBox.js';
import Button from '../../elements/Button/Button.js';
import { order as orderCreators } from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import './order-pay.scss';

const YOOMONEY_WALLET_NUMBER = '4100116345069505';

export default function OrderPay() {
  const { id } = useParams();

  const selector = (state) => state.order;
  const { data: orderData } = useSelector(selector);

  const orderUrl = routes.order.to.replace(':id', id);

  const yoomoneyForm = () => {
    const description = `tbacco.ru: оплата заказа #${orderData.number}`;
    const successUrl = window.location.origin + orderUrl;

    return (
      <form
        method="POST"
        action="https://yoomoney.ru/quickpay/confirm.xml"
        className="yoomoney-form"
      >
        <input type="hidden" name="receiver" value={YOOMONEY_WALLET_NUMBER} />
        <input type="hidden" name="quickpay-form" value="shop" />
        <input type="hidden" name="targets" value={description} />
        <input type="hidden" name="label" value={orderData.id} />
        <input
          type="hidden"
          name="sum"
          value={orderData.total_incl_tax}
          data-type="number"
        />

        <input type="hidden" name="formcomment" value={description} />
        <input type="hidden" name="short-dest" value={description} />
        <input type="hidden" name="successURL" value={successUrl} />
        <input type="hidden" name="need-fio" value="false" />
        <input type="hidden" name="need-email" value="false" />
        <input type="hidden" name="need-phone" value="false" />
        <input type="hidden" name="need-address" value="false" />

        <InputCard
          titleJsx="Способ оплаты"
          cardClassName="yoomoney-form__payment-type"
        >
          <RadioCheckBox name="paymentType" value="PC" defaultChecked>
            С кошелька ЮMoney
          </RadioCheckBox>
          <RadioCheckBox name="paymentType" value="AC">
            Банковской картой
          </RadioCheckBox>
        </InputCard>

        <Button type="submit">Оплатить</Button>
      </form>
    );
  };

  let render = () => null;

  if (orderData.payment) {
    if (
      orderData.payment.type === 'yoomoney' &&
      orderData.payment.status === 'new'
    ) {
      render = yoomoneyForm;
    } else {
      return <Redirect to={orderUrl} />;
    }
  }

  return (
    <LoadablePage selector={selector} request={() => orderCreators.request(id)}>
      <TitledPage titleJsx={`Оплата заказа #${orderData.number}`}>
        {render()}
      </TitledPage>
    </LoadablePage>
  );
}
