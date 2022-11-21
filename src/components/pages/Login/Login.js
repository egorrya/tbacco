import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { login as loginCreators } from '../../../actions/actionCreators.js';
import useToken from '../../../hooks/useToken.js';
import routes from '../../../routes.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import TitledBlock from '../../partials/TitledBlock/TitledBlock.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import { showErrors } from '../../utils.js';
import './login.scss';

export default function Login() {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const { loading: loginLoading, error: loginError } = useSelector(
    (state) => state.login
  );

  const dispatch = useDispatch();
  const token = useToken();
  const location = useLocation();

  if (token) {
    const params = new URLSearchParams(location.search);
    const nextUri = params.get('next') || routes.profile.to;
    return <Redirect to={nextUri} />;
  }

  const onLoginSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginCreators.request({
        username: loginRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  return (
    <TitledPage titleJsx="Вход" containerData={{ className: 'login-page' }}>
      <form onSubmit={onLoginSubmit} className="login-form">
        <div className="login-form__inputs">
          <TitledBlock titleJsx="Email или телефон">
            <input
              className="tbacco-input"
              type="text"
              placeholder="hello@email.com"
              required
              ref={loginRef}
            />
          </TitledBlock>
          <TitledBlock titleJsx="Пароль">
            <input
              className="tbacco-input"
              type="password"
              placeholder=""
              required
              ref={passwordRef}
            />
          </TitledBlock>
        </div>

        {loginError &&
          showErrors(loginError.response, {
            non_field: { invalid_credentials: 'неверный логин или пароль' },
          })}

        <div className="login-form__controls">
          <LoadingButton text="Войти" loading={loginLoading} />
          <SoftLink
            to={routes.passwordReset.to}
            className="custom-link login-form__controls__link"
          >
            Не помните пароль?
          </SoftLink>
        </div>
      </form>

      <div className="login__register-banner">
        Нет аккаунта?{' '}
        <SoftLink
          className="custom-link login__register-banner__link"
          to={routes.register.to}
        >
          Зарегистрируйтесь
        </SoftLink>
        , чтобы видеть все товары.
      </div>
    </TitledPage>
  );
}
