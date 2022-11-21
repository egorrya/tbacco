/* eslint-disable import/prefer-default-export */
import React from 'react';
import ErrorBox from './partials/ErrorBox/ErrorBox.js';

const DEFAULT_ERROR_MESSAGE = 'непредвиденная ошибка на сервере';
const PRICE_FORMATTER = new Intl.NumberFormat('ru-RU');

export function showErrors(errors, descriptions = {}) {
  if (!errors || !Array.isArray(errors))
    return <ErrorBox msg={DEFAULT_ERROR_MESSAGE} />;

  const flatErrors = errors
    .map((e) => {
      if (e.errors) {
        return e.errors.map((err) => ({
          field: e.field,
          ...err,
        }));
      }
      return [
        {
          field: 'non_field',
          ...e,
        },
      ];
    })
    .flat();

  const extractDescription = (field, code) => {
    const fieldErrors = descriptions[field];
    if (fieldErrors) {
      const description = fieldErrors[code];
      if (description) {
        return description;
      }
    }
    return `неожиданная ошибка: ${field}-${code}`;
  };

  return (
    <>
      {flatErrors.map((e) => (
        <ErrorBox
          key={`${e.field}-${e.code}`}
          msg={extractDescription(e.field, e.code)}
        />
      ))}
    </>
  );
}

export function formatPrice(price) {
  if (price === 0) return `${PRICE_FORMATTER.format(price)} ₽`;
  return price
    ? `${PRICE_FORMATTER.format(price)} ₽`
    : 'цена временно отсутствует';
}

export function formatDate(strDate) {
  const dt = new Date(strDate);

  const mm = dt.getMonth() + 1;
  const dd = dt.getDate();

  return [
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    dt.getFullYear() - 2000,
  ].join('.');
}

export function repeatSendPassword(signature) {
  fetch(`${process.env.API_ENDPOINT}/register/verify/sms-repeat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ signature }),
  })
    .then((response) => {
      if (response.ok) {
        alert('Смс сообщение отправлено еще раз');
      } else {
        alert('Повторная отправка смс ограничена, попробуйте позднее');
      }
    })
    .catch((reason) => {
      console.log('register/verify/sms-repeat/ error, reason :>> ', reason);
      alert('Что-то пошло не так :( Попробуйте начать с начала');
    });
}

export function extractCategoryId(cat) {
  if (!cat) return null;
  const categorySplit = cat.split('-');
  return categorySplit.length && categorySplit[categorySplit.length - 1];
}

export function extractProductId(id) {
  if (!id) return undefined;
  const idSplit = id.split('-')
  return idSplit.length && idSplit[idSplit.length - 1];
}