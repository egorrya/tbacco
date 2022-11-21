import React from 'react';
import Switch from '../../elements/Switch/Switch.js';
import './account-type.scss';

export default function AccountType({
  titleJsx,
  selectedValue = 'retail',
  disabled = false,
  onAccountTypeChanged = null,
}) {
  return (
    <div className="account-type">
      {titleJsx && <div className="account-type__title">{titleJsx}</div>}
      <Switch
        leftValue="retail"
        leftJsx="Для себя"
        rightValue="wholesale"
        rightJsx="Оптовые покупки"
        selectedValue={selectedValue}
        disabled={disabled}
        onSwitch={onAccountTypeChanged}
      />
    </div>
  );
}
