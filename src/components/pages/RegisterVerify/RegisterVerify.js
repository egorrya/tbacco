import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
  login as loginCreators,
  register as registerCreators,
  registerVerify as registerVerifyCreators,
} from '../../../actions/actionCreators.js';
import routes from '../../../routes.js';
import Button from '../../elements/Button/Button.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import TitledBlock from '../../partials/TitledBlock/TitledBlock.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import { repeatSendPassword, showErrors } from '../../utils.js';
import './register-verify.scss';

export default function RegisterVerify() {
  const { data: registerData } = useSelector((state) => state.register);
  const {
    data: registerVerifyData,
    loading: registerVerifyLoading,
    error: registerVerifyError,
  } = useSelector((state) => state.registerVerify);

  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (registerVerifyData.auth_token) {
      dispatch(registerCreators.clear());
      dispatch(loginCreators.success(registerVerifyData));
      history.push(routes.profile.to);
    }
  }, [registerVerifyData]);

  if (!registerData.signature) {
    return <Redirect to={routes.login.to} />;
  }

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    dispatch(
      registerVerifyCreators.request({
        signature: registerData.signature,
        password: passwordRef.current.value,
      })
    );
  };

  const onRepeatClick = () => {
    repeatSendPassword(registerData.signature);
  };

  return (
    <TitledPage
      titleJsx="Подтверждение регистрации"
      containerData={{ className: 'register-verify-content' }}
    >
      <form onSubmit={onRegisterSubmit}>
        <TitledBlock titleJsx="Пароль">
          <input
            className="tbacco-input"
            type="password"
            placeholder="Пароль"
            required
            ref={passwordRef}
          />
        </TitledBlock>
        {registerVerifyError &&
          showErrors(registerVerifyError.response, {
            non_field: {
              incorrect_code: 'неверный код',
              registration_timeout:
                'время вышло, начните процесс регистрации с начала',
              throttled:
                'повторная отправка смс ограничена, попробуйте позднее',
            },
            signature: {
              required: 'ошибка в процессе регистраци, начните с начала',
            },
          })}
        <LoadingButton text="Подтвердить" loading={registerVerifyLoading} />
      </form>

      <Button onClick={onRepeatClick}>Отправить смс повторно</Button>
    </TitledPage>
  );
}
