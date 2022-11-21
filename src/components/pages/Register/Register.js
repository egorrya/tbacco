import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { register as registerCreators } from '../../../actions/actionCreators.js';
import useToken from '../../../hooks/useToken.js';
import routes from '../../../routes.js';
import CheckBox from '../../elements/CheckBox/CheckBox.js';
import LinkRel from '../../elements/LinkRel/LinkRel.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import TitledBlock from '../../partials/TitledBlock/TitledBlock.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import { showErrors } from '../../utils.js';
import './register.scss';

export default function Register() {
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const {
    data: registerData,
    loading: registerLoading,
    error: registerError,
  } = useSelector((state) => state.register);

  const dispatch = useDispatch();
  const token = useToken();
  const location = useLocation();

  if (registerData.signature) {
    return <Redirect to={routes.registerVerify.to} />;
  }

  if (token) {
    const params = new URLSearchParams(location.search);
    const nextUri = params.get('next') || routes.profile.to;
    return <Redirect to={nextUri} />;
  }

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    dispatch(
      registerCreators.request({
        username: `+7${phoneRef.current.value}`,
        email: emailRef.current.value,
        first_name: nameRef.current.value,
        wholesale: false,
      })
    );
  };

  return (
    <TitledPage
      titleJsx="Регистрация"
      containerData={{ className: 'register-page' }}
    >
      <form onSubmit={onRegisterSubmit} className="register-form">
        <div className="register-form__inputs">
          <TitledBlock titleJsx="Имя">
            <input
              className="tbacco-input"
              type="text"
              placeholder="Имя"
              required
              ref={nameRef}
            />
          </TitledBlock>
          <TitledBlock titleJsx="Email">
            <input
              className="tbacco-input"
              type="email"
              placeholder="Email"
              required
              ref={emailRef}
            />
          </TitledBlock>
          <TitledBlock
            titleJsx="Телефон"
            containerData={{className: 'tbacco-phone-container'}}
          >
            <input
              className="tbacco-input"
              type="tel"
              placeholder="xxx xxx xx xx"
              required
              ref={phoneRef}
            />
          </TitledBlock>
        </div>

        <CheckBox
          id="register-agreement"
          required
          className="custom-checkbox__input register-form__agreement"
        >
          <div className="register-agreement">
            Я ознакомлен(-а) с{' '}
            <LinkRel href={routes.agreement.to} target="_blank">
              пользовательским соглашением
            </LinkRel>
            , даю согласие на обработку моих персональных данных.
          </div>
        </CheckBox>

        {registerError &&
          showErrors(registerError.response, {
            non_field: {
              throttled:
                'превышено количество попыток регистрации, попробуйте позднее',
            },
            username: {
              phone_already_registered:
                'этот телефон уже зарегистрирован в системе',
            },
            email: {
              email_already_registered:
                'этот email уже зарегистрирован в системе',
              invalid: 'некорректный email',
            },
          })}

        <LoadingButton text="Зарегистрироваться" loading={registerLoading} />
      </form>

      <div className="register__login-banner">
        Есть аккаунт?{' '}
        <SoftLink
          className="custom-link register__login-banner__link"
          to={routes.login.to}
        >
          Войдите
        </SoftLink>
        , чтобы видеть все товары.
      </div>
    </TitledPage>
  );
}
