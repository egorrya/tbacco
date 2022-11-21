import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { address as addressCreators, addressUpdate as addressUpdateCreators } from "../../../actions/actionCreators.js";
import LoadingButton from "../../elements/LoadingButton/LoadingButton.js";
import TextInput from "../../elements/TextInput/TextInput.js";
import AccountPage from "../../partials/AccountPage/AccountPage.js";
import CardContent from "../../partials/CardContent/CardContent.js";
import LoadablePage from "../../partials/LoadablePage/LoadablePage.js";
import TitledPage from "../../partials/TitledPage/TitledPage.js";
import { showErrors } from "../../utils.js";
import "./address.scss";

export default function Address() {
  const { id } = useParams();
  const selector = (state) => state.address;
  const { data: addressData } = useSelector(selector);
  const { loading: addressUpdateLoading, error: addressUpdateError } = useSelector((state) => state.addressUpdate);
  const dispatch = useDispatch();

  const countryRef = useRef(null);
  const zipRef = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);

  const updateAddress = (event) => {
    event.preventDefault();
    dispatch(
      addressUpdateCreators.request({
        id,
        line1: addressRef.current.value,
        line4: cityRef.current.value,
        postcode: zipRef.current.value,
      })
    );
  };

  return (
    <TitledPage titleJsx="Изменение адреса">
      <AccountPage>
        <LoadablePage selector={selector} request={() => addressCreators.request(id)}>
          <form className="address" onSubmit={updateAddress}>
            <CardContent>
              <div className="address__inputs">
                <TextInput type="text" placeholder="Страна" required readOnly ref={countryRef} defaultValue="Россия" />

                <TextInput
                  type="text"
                  placeholder="Почтовый индекс"
                  required
                  ref={zipRef}
                  defaultValue={addressData.postcode}
                />
                <TextInput type="text" placeholder="Город" required ref={cityRef} defaultValue={addressData.line4} />
                <TextInput type="text" placeholder="Адрес" required ref={addressRef} defaultValue={addressData.line1} />
              </div>

              <div className="address__btn-errors">
                {addressUpdateError && showErrors(addressUpdateError.response)}
                <LoadingButton text="Сохранить изменения" loading={addressUpdateLoading} />
              </div>
            </CardContent>
          </form>
        </LoadablePage>
      </AccountPage>
    </TitledPage>
  );
}
