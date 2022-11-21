import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
  login as loginCreators,
  passwordReset as passwordResetCreators,
  passwordResetVerify as passwordResetVerifyCreators,
} from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import Button from '../../elements/Button/Button.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import TitledBlock from '../../partials/TitledBlock/TitledBlock.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import { repeatSendPassword, showErrors } from '../../utils.js';
import './password-reset-verify.scss';

export default function PasswordResetVerify() {
  const { data: passwordResetData } = useSelector(
    (state) => state.passwordReset
  );
  const {
    data: passwordResetVerifyData,
    loading: passwordResetVerifyLoading,
    error: passwordResetVerifyError,
  } = useSelector((state) => state.passwordResetVerify);

  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (passwordResetVerifyData.auth_token) {
      dispatch(passwordResetCreators.clear());
      dispatch(loginCreators.success(passwordResetVerifyData));
      history.push(routes.profile.to);
    }
  }, [passwordResetVerifyData]);

  if (!passwordResetData.signature) {
    return <Redirect to={routes.passwordReset.to} />;
  }

  const onResetSubmit = (event) => {
    event.preventDefault();
    dispatch(
      passwordResetVerifyCreators.request({
        signature: passwordResetData.signature,
        password: passwordRef.current.value,
      })
    );
  };

  const onRepeatClick = () => {
    repeatSendPassword(passwordResetData.signature);
  };

  return (
    <TitledPage
      titleJsx="Восстановление пароля"
      containerData={{ className: 'password-reset-verify-content' }}
    >
      <div className="password-reset-verify-content__info">
        Введите пароль, полученный в СМС сообщении. Этот пароль будет Вашим
        новым паролем. Его можно сменить в личном кабинете.
      </div>

      <form onSubmit={onResetSubmit}>
        <TitledBlock titleJsx="Пароль">
          <input
            className="tbacco-input"
            type="password"
            placeholder="Пароль"
            required
            ref={passwordRef}
          />
        </TitledBlock>
        {passwordResetVerifyError &&
          showErrors(passwordResetVerifyError.response, {
            non_field: {
              incorrect_code: 'неверный код',
              throttled:
                'повторная отправка смс ограничена, попробуйте позднее',
            },
            signature: {
              required: 'ошибка в процессе регистраци, начните с начала',
            },
          })}
        <LoadingButton
          text="Подтвердить"
          loading={passwordResetVerifyLoading}
        />
      </form>

      <Button onClick={onRepeatClick}>Отправить смс повторно</Button>
    </TitledPage>
  );
}
