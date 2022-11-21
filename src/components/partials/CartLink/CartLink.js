import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import routes from '../../../routes.js';
import images from '../../../images.js';
import './cart-link.scss';

export default function CartLink({
  linkProps = {},
  imgProps = {},
  amountProps = {},
}) {
  const { data: cartData } = useSelector((state) => state.cart);
  const [ animationClass, setAnimationClass ] = useState('');
  const [ cartQty, setCartQty ] = useState(0);

  const calcCartItems = () => {
    if (!cartData.lines || cartData.lines.length === 0) {
      return 0;
    }
    const qty = cartData.lines.map(
      (line) => line.quantity).reduce((a, b) => a + b
    );
    return qty;
  };

  const { className: linkClass, ...linkOptionsRest } = linkProps;
  const { className: imgClass, ...imgOptionsRest } = imgProps;
  const { className: amountClass, ...amountOptionsRest } = amountProps;

  useEffect(() => {
    if (cartQty < calcCartItems()) {
      setCartQty(calcCartItems());
      setAnimationClass('cart-link-btn_animation');
      setTimeout(() => {
        setAnimationClass('');
      }, 2000);
    }
  }, [cartData])

  return (
    <SoftLink
      {...linkOptionsRest}
      className={
        `cart-link-btn ${animationClass} ${linkClass || ''}`
      }
      to={routes.cart.to}
    >
      <img
        {...imgOptionsRest}
        className={imgClass}
        alt="cart"
        src={images.cart}
      />
      <span
        {...amountOptionsRest}
        className={`cart-link-btn__qty ${amountClass || ''}`}
      >
        {calcCartItems()}
      </span>
    </SoftLink>
  );
}
