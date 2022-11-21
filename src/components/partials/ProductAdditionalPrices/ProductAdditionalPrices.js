import React, { useState } from 'react';
import './product-additional-prices.scss';
import { formatPrice } from '../../utils.js';
import images from '../../../images';

export default function ProductAdditionalPrices({ id, stockrecord }) {
  const [stockrecordsOpen, setStockrecordsOpen] = useState(null);

  const onStockrecordsButtonClick = (prodId) => {
    if (stockrecordsOpen === null && prodId !== null) {
      setStockrecordsOpen(prodId)
    } else {
      setStockrecordsOpen(null)
    }
  }

  const stock = (
    stockrecord.price_upto10k ||
    stockrecord.price_upto30k ||
    stockrecord.price_from30k
  ) ? stockrecord : null;

  return stock && (
    <button
      className="stockrecords"
      type="button"
      onPointerOver={() => onStockrecordsButtonClick(id)}
      onPointerOut={() => onStockrecordsButtonClick(null)}
    >
      <img src={images.info} width="16" height="16" />
      <div className={`stockrecords__list${
        stockrecordsOpen === id ? ' active' : ''
      }`}>
        <p>- Розничная (до 10к): <br/>
          <b>
            &nbsp;
            {stock.price_upto10k ? (
              formatPrice(stock.price_upto10k)
            ) : 'неизвестно'}
          </b>
        </p>
        <p>- Мелкооптовая (до 30к): <br/>
          <b>
            &nbsp;
            {stock.price_upto30k ? (
              formatPrice(stock.price_upto30k)
            ) : 'неизвестно'}
          </b>
        </p>
        <p>- Оптовая (от 30к): <br/>
          <b>
            &nbsp;
            {stock.price_from30k ? (
              formatPrice(stock.price_from30k)
            ) : 'неизвестно'}
          </b>
        </p>
      </div>
    </button>
  )
}
