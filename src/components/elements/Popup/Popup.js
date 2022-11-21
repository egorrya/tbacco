import React from 'react';
import { useSelector } from 'react-redux';
import './popup.scss';

export function CheckoutPopup() {
  const { data } = useSelector((state) => state.checkout);

  return (
    <div
      className={`checkout-popup-container ${
        (data && data.id && 'fade-in') || 'fade-out'
      }`}
    >
      <span>Заказ успешно оформлен</span>
      <span>Менеджер свяжется с Вами в ближайшее время</span>
    </div>
  );
}
