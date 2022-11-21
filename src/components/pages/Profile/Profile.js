import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../elements/TextInput/TextInput.js';
import AccountPage from '../../partials/AccountPage/AccountPage.js';
import AccountType from '../../partials/AccountType/AccountType.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import LoadingButton from '../../elements/LoadingButton/LoadingButton.js';
import {
  profile,
  profileUpdate,
  passwordChange,
} from '../../../actions/actionCreators.js';
import { showErrors } from '../../utils.js';
import './profile.scss';

export default function Profile() {
  const selector = (state) => state.profile;
  const { data: profileData } = useSelector(selector);

  const {
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = useSelector((state) => state.profileUpdate);
  const {
    loading: passwordChangeLoading,
    error: passwordChangeError,
  } = useSelector((state) => state.passwordChange);

  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const birthdayRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [accountType, setAccountType] = useState(
    profileData.wholesale ? 'wholesale' : 'retail'
  );

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const repeatNewPasswordRef = useRef(null);

  useEffect(() => {
    setAccountType(profileData.wholesale ? 'wholesale' : 'retail');
  }, [profileData]);

  const onUpdateProfileSubmit = (event) => {
    event.preventDefault();
    dispatch(
      profileUpdate.request({
        first_name: nameRef.current.value,
        last_name: lastnameRef.current.value,
        birth_date: birthdayRef.current.value,
        email: emailRef.current.value,
        username: phoneRef.current.value,
        wholesale: accountType === 'wholesale',
      })
    );
  };

  const onChangePasswordSubmit = (event) => {
    event.preventDefault();
    if (newPasswordRef.current.value !== repeatNewPasswordRef.current.value) {
      alert('Новые пароли не совпадают!');
      return;
    }
    dispatch(
      passwordChange.request({
        old_password: currentPasswordRef.current.value,
        password: newPasswordRef.current.value,
      })
    );
  };

  return (
    <TitledPage titleJsx="Профиль">
      <AccountPage>
        <LoadablePage selector={selector} request={profile.request}>
          <div className="profile-content">
            <form
              onSubmit={onUpdateProfileSubmit}
              className="profile-content__info"
            >
              <TextInput
                type="text"
                placeholder="Имя"
                required
                ref={nameRef}
                defaultValue={profileData.first_name}
              />
              <TextInput
                type="text"
                placeholder="Фамилия"
                required
                ref={lastnameRef}
                defaultValue={profileData.last_name}
              />
              <TextInput
                type="date"
                placeholder="Дата рождения"
                required
                ref={birthdayRef}
                defaultValue={profileData.birth_date}
              />
              <TextInput
                type="email"
                placeholder="Email"
                required
                ref={emailRef}
                defaultValue={profileData.email}
              />
              <TextInput
                type="text"
                placeholder="Телефон"
                required
                ref={phoneRef}
                defaultValue={profileData.username}
              />
              <AccountType
                titleJsx="Тип аккаунта"
                selectedValue={accountType}
                onAccountTypeChanged={setAccountType}
              />

              {profileUpdateError &&
                showErrors(profileUpdateError.response, {
                  email: {
                    email_exists: 'данный email занят',
                    invalid: 'введен некорректный email',
                    unique: 'пользователь с таким email уже существует',
                  },
                  username: {
                    invalid_phone_number: 'введен некорректный номер телефона',
                    unique:
                      'пользователь с таким номером телефона уже существует',
                  },
                })}
              <LoadingButton text="Сохранить" loading={profileUpdateLoading} />
            </form>

            <form
              onSubmit={onChangePasswordSubmit}
              className="profile-content__password"
            >
              <div className="profile-content__password__title">
                Изменить пароль
              </div>
              <TextInput
                type="password"
                placeholder="Действующий пароль"
                required
                ref={currentPasswordRef}
              />
              <TextInput
                type="password"
                placeholder="Новый пароль"
                required
                ref={newPasswordRef}
              />
              <TextInput
                type="password"
                placeholder="Повторите новый пароль"
                required
                ref={repeatNewPasswordRef}
              />

              {passwordChangeError &&
                showErrors(passwordChangeError.response, {
                  old_password: {
                    password_incorrect: 'действуйщий пароль указан неверно',
                  },
                  password: {
                    password_too_similar: 'новый пароль слишком простой',
                    password_too_short: 'новый пароль слишком короткий',
                    password_too_common: 'новый пароль слишком обобщенный',
                    password_entirely_numeric:
                      'новый пароль не должен состоять только из цифр',
                  },
                })}
              <LoadingButton text="Сохранить" loading={passwordChangeLoading} />
            </form>
          </div>
        </LoadablePage>
      </AccountPage>
    </TitledPage>
  );
}
