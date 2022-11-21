import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import InputCard from '../../partials/InputCard/InputCard.js';
import TextInput from '../../elements/TextInput/TextInput.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import RadioCheckBox from '../../elements/RadioCheckBox/RadioCheckBox.js';
import CheckBox from '../../elements/CheckBox/CheckBox.js';
import LinkRel from '../../elements/LinkRel/LinkRel.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import Loading from '../../partials/Loading/Loading.js';
import { formatPrice, showErrors } from '../../utils.js';
import routes from '../../../routes.js';
import cities from '../../../cities.js';
import {
  deliveryTypes as deliveryTypesCreators,
  deliveryCost as deliveryCostCreators,
  checkout as checkoutCreators,
  addresses as addressesCreators,
} from '../../../actions/actionCreators.js';
import './checkout.scss';

export default function Checkout() {
  const selector = (state) => state.deliveryTypes;
  const { data: deliveryTypesData } = useSelector(selector);
  const { loading: deliveryCostLoading } = useSelector(
    (state) => state.deliveryCost
  );
  const { data: cartData } = useSelector((state) => state.cart);
  const { data: profileData } = useSelector((state) => state.profile);
  const {
    data: checkoutData,
    loading: checkoutLoading,
    error: checkoutError,
  } = useSelector((state) => state.checkout);

  const addressesSelector = (state) => state.addresses;
  const {
    data: { results: addressesData },
  } = useSelector(addressesSelector);

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const birthdayRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const orderCommentRef = useRef(null);

  const cityRef = useRef(null);
  const addressRef = useRef(null);

  const [deliveryType, setDeliveryType] = useState({});
  const [disabledDeliveryTypes, setDisabledDeliveryTypes] = useState([]);
  const [paymentType, setPaymentType] = useState();
  const [disabledPaymentTypes, setDisabledPaymentTypes] = useState([]);

  const dispatch = useDispatch();

  const defaultAddress =
    (addressesData && addressesData.length > 0 && addressesData[0]) || {};

  const deliveryCost = deliveryType && deliveryType.price
    ? Number.parseFloat(deliveryType.price.incl_tax)
    : Number.NaN;

  useEffect(() => {
    if (!Array.isArray(deliveryTypesData) || deliveryTypesData.length === 0) {
      return;
    }

    if (deliveryType && deliveryType.code) {
      setDeliveryType(
        deliveryTypesData.find((dt) => dt.code === deliveryType.code)
      );
    } else {
      setDeliveryType(deliveryTypesData[0]);
    }
  }, [deliveryTypesData]);

  useEffect(() => {
    if (!deliveryType || !deliveryType.price) {
      return;
    }

    dispatch(deliveryCostCreators.clear());

    if (Number.isNaN(deliveryCost)) {
      dispatch(
        deliveryCostCreators.request({
          line1: 'line',
          line4: cityRef.current.value,
        })
      );
    }
  }, [deliveryType]);

  if ('id' in checkoutData) {
    const orderInfoUrl = routes.order.to.replace(':id', checkoutData.id);
    setTimeout(() => {
      dispatch(checkoutCreators.clear());
    }, 0);
    return <Redirect to={orderInfoUrl} />;
  }

  if (cartData.lines && cartData.lines.length === 0) {
    return <Redirect to={routes.main.to} />;
  }

  const onDeliveryTypeChange = (event) => {
    setDeliveryType(deliveryTypesData.find(
      (dt) => dt.code === event.currentTarget.value
    ));
  };

  const onCityChanged = () => {
    const cityValue = cityRef.current.value;
    if (![
      'москва',
      'московская область',
      'moscow'
    ].includes(cityValue.trim().toLowerCase())) {
      setDisabledDeliveryTypes(['pickup', 'moscow-courier']);
      setDeliveryType(deliveryTypesData.find(
        (dt) => dt.code === 'transport-company'
      ));

      setDisabledPaymentTypes(['cash']);
      setPaymentType('transfer');
    } else {
      setDisabledDeliveryTypes([]);
      setDisabledPaymentTypes([]);
    }
    dispatch(
      deliveryCostCreators.request({
        line1: 'line',
        line4: cityValue,
      })
    );
  };

  const onSubmitOrder = (event) => {
    event.preventDefault();
    dispatch(
      checkoutCreators.request({
        shipping_method_code: event.target.deliveryType.value,
        shipping_charge: {
          currency: 'RUB',
          excl_tax: deliveryCost,
          tax: 0,
        },
        shipping_address: {
          first_name: nameRef.current.value,
          last_name: lastnameRef.current.value,
          line1: addressRef.current.value,
          line4: cityRef.current.value,
          notes: orderCommentRef.current.value,
          phone_number: phoneRef.current.value
        },
        payment_method_code: event.target.paymentType.value,
      })
    );
  };

  const costOutput = (calc) => {
    if (deliveryCostLoading) {
      return <Loading className="checkout__cost-loading" />;
    }

    if (!Number.isNaN(deliveryCost)) {
      return formatPrice(calc());
    }

    return 'укажите адрес';
  };

  return (
    <TitledPage titleJsx="Оформление заказа">
      <LoadablePage
        selector={addressesSelector}
        request={addressesCreators.request}
      >
        <LoadablePage
          selector={selector}
          request={deliveryTypesCreators.request}
        >
          <form className="checkout" onSubmit={onSubmitOrder}>
            <InputCard
              titleJsx="Данные о покупателе"
              cardClassName="checkout__customer-form"
            >
              <TextInput
                type="text"
                placeholder="Имя"
                required
                ref={nameRef}
                defaultValue={profileData.first_name}
              />
              <TextInput
                type="text"
                placeholder="Фамилия"
                required
                ref={lastnameRef}
                defaultValue={profileData.last_name}
              />
              <TextInput
                type="date"
                placeholder="Дата рождения"
                required
                ref={birthdayRef}
                defaultValue={profileData.birth_date}
              />
              <TextInput
                type="email"
                placeholder="Email"
                required
                ref={emailRef}
                defaultValue={profileData.email}
              />
              <TextInput
                type="text"
                placeholder="Телефон"
                required
                ref={phoneRef}
                defaultValue={profileData.username}
              />
            </InputCard>

            <InputCard
              titleJsx="Куда доставить заказ?"
              cardClassName="checkout__delivery-address"
            >
              <TextInput
                type="text"
                placeholder="Город"
                required
                ref={cityRef}
                onChange={onCityChanged}
                defaultValue={defaultAddress.line4}
                list="cities"
              />
              <TextInput
                type="text"
                placeholder="Адрес"
                required
                ref={addressRef}
                defaultValue={defaultAddress.line1}
              />
              <TextInput
                node="textarea"
                rows="2"
                placeholder="Комментарии к заказу (необязательно)"
                ref={orderCommentRef}
              />
              <datalist id="cities">
                {cities.map(c => <option key={c} value={c} />)}
              </datalist>
            </InputCard>

            <InputCard
              titleJsx="Способ доставки"
              cardClassName="checkout__delivery-type"
            >
              {Array.isArray(deliveryTypesData) && (
                <div className="checkout__delivery-type__types">
                  {deliveryTypesData.map((dt) => (
                    (!disabledDeliveryTypes.includes(dt.code)) && (
                      <RadioCheckBox
                        key={dt.code}
                        name="deliveryType"
                        value={dt.code}
                        checked={deliveryType.code === dt.code}
                        onChange={onDeliveryTypeChange}
                      >
                        {dt.name}
                      </RadioCheckBox>
                    )
                  ))}

                  <div className="checkout__delivery-type__cost">
                    Стоимость доставки:<br />
                    <span>{costOutput(() => deliveryCost)}</span>
                  </div>
                </div>
              )}
            </InputCard>

            <InputCard
              titleJsx="Способ оплаты"
              cardClassName="checkout__payment-type"
            >
              {!disabledPaymentTypes.includes('cash') && (
                <RadioCheckBox name="paymentType" value="cash" defaultChecked>
                  Наличными
                </RadioCheckBox>
              )}

              {!disabledPaymentTypes.includes('transfer') && (
                <RadioCheckBox name="paymentType" value="transfer">
                  Переводом на карту
                </RadioCheckBox>
              )}
            </InputCard>

            <div className="checkout__cost">
              Итого сумма заказа с учётом доставки:{' '}
              {costOutput(
                () => Number.parseFloat(cartData.total_incl_tax) + deliveryCost
              )}
            </div>

            <CheckBox id="checkout-agreement-checkbox" required>
              <div>
                Я ознакомлен(-а) с{' '}
                <LinkRel href={routes.agreement.to} target="_blank">
                  пользовательским соглашением
                </LinkRel>
                , даю согласие на обработку моих персональных данных.
              </div>
            </CheckBox>

            <div className="checkout__button-errors">
              <LoadingButton
                text="Подтвердить заказ"
                loading={checkoutLoading}
              />
              {checkoutError && showErrors(checkoutError.response)}
            </div>
          </form>
        </LoadablePage>
      </LoadablePage>
    </TitledPage>
  );
}
