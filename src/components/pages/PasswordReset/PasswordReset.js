import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { passwordReset as passwordResetCreators } from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import TitledBlock from '../../partials/TitledBlock/TitledBlock.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import { showErrors } from '../../utils.js';
import './password-reset.scss';

export default function PasswordReset() {
  const {
    data: passwordResetData,
    loading: passwordResetLoading,
    error: passwordResetError,
  } = useSelector((state) => state.passwordReset);

  const usernameRef = useRef();
  const dispatch = useDispatch();

  if (passwordResetData.signature) {
    return <Redirect to={routes.passwordResetVerify.to} />;
  }

  const onResetSubmit = (event) => {
    event.preventDefault();
    dispatch(
      passwordResetCreators.request({
        username: `+7${usernameRef.current.value}`,
      })
    );
  };

  return (
    <TitledPage
      titleJsx="Восстановление пароля"
      containerData={{ className: 'password-reset-content' }}
    >
      <div className="password-reset-content__info">
        Укажите телефон, привязанный к вашему профилю. Если такой телефон
        зарегистрирован в системе, то Вам будет отправлено СМС сообщение с новым
        паролем.
      </div>

      <form onSubmit={onResetSubmit}>
        <TitledBlock
          titleJsx="Телефон"
          containerData={{ className: 'tbacco-phone-container' }}
        >
          <input
            className="tbacco-input"
            type="text"
            placeholder="xxx xxx xx xx"
            required
            ref={usernameRef}
          />
        </TitledBlock>
        {passwordResetError &&
          showErrors(passwordResetError.response, {
            non_field: {
              incorrect_code: 'неверный код',
              registration_timeout:
                'время вышло, начните процесс регистрации с начала',
              throttled:
                'повторная отправка смс ограничена, попробуйте позднее',
            },
            username: {
              invalid: 'укажите корректный номер телефона',
            },
          })}
        <LoadingButton text="Отправить" loading={passwordResetLoading} />
      </form>
    </TitledPage>
  );
}
