import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import {
  product as productCreators,
  cart as cartCreators,
  wishlist as wishlistCreators,
  wishlistAdd as wishlistAddCreators,
  wishlistDelete as wishlistDeleteCreators,
} from '../../../actions/actionCreators.js';
import LoadablePage from '../LoadablePage/LoadablePage.js';
import SliderPreview from '../SliderPreview/SliderPreview.js';
import ZoomableImg from '../../elements/ZoomableImg/ZoomableImg.js';
import LinkRel from '../../elements/LinkRel/LinkRel.js';
import Loading from '../Loading/Loading.js';
import images from '../../../images.js';
import { formatPrice, showErrors } from '../../utils.js';
import './product-content.scss';
import { product } from '../../../actions/actionTypes.js';


const IMAGE_NOT_FOUND_URL = '/media/image_not_found.jpg';

export default function ProductContent({ id }) {
  const selector = (state) => state.product;
  const { data: productData } = useSelector(selector);
  const { errorLine } = useSelector((state) => state.cart);
  const { data: profileData } = useSelector((state) => state.profile);

  const { loading: wishlistAddLoading, error: wishlistAddError } = useSelector(
    (state) => state.wishlistAdd
  );
  const {
    loading: wishlistDeleteLoading,
    error: wishlistDeleteError,
  } = useSelector((state) => state.wishlistDelete);
  const {
    data: { results: wishlistData },
  } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();
  const [purchaseValue, setPurchaseValue] = useState(1);

  useEffect(() => {
    dispatch(wishlistCreators.request());
  }, [dispatch]);

  const availabilityAmount = productData.availability
    ? productData.availability.num_available
    : 0;

  const requestData = () => {
    return productCreators.request(id);
  };

  const makeSliderData = (containerClassName, node) => {
    if (!Array.isArray(productData.images)) return [];
    const productImages =
      productData.images.length > 0
        ? productData.images
        : [
            {
              original: IMAGE_NOT_FOUND_URL,
              caption: 'not found',
              id: 'not_found',
            },
          ];
    return productImages.map((im) => (
      <div className={containerClassName} key={im.id}>
        {React.createElement(node, { src: im.original, alt: im.caption })}
      </div>
    ));
  };

  const onPurchaseClick = () => {
    dispatch(
      cartCreators.appendProductRequest({
        id,
        quantity: purchaseValue,
      })
    );
    setPurchaseValue(1);
  };

  const inWishlist =
    (wishlistData &&
      wishlistData.filter((w) => w.product.id === productData.id)) ||
    [];
  const wishlistId = inWishlist.length > 0 ? inWishlist[0].id : null;

  const onWishClick = () => {
    if (wishlistId) {
      dispatch(wishlistDeleteCreators.request(wishlistId));
    } else {
      dispatch(wishlistAddCreators.request({ product: productData.id }));
    }
  };

  const category = productData.categories ? productData.categories[0] : {};
  const stock = (
    productData.stockrecord && (
      productData.stockrecord.price_upto10k ||
      productData.stockrecord.price_upto30k ||
      productData.stockrecord.price_from30k
    )
  ) ? productData.stockrecord : null;

  return (
    <LoadablePage selector={selector} request={requestData}>
      <Helmet defaultTitle="tbacco">
        <title>{productData.title}</title>
      </Helmet>
      <div className="product-content">
        <div className="product-content__card">
          <SliderPreview
            mainSliderData={makeSliderData(
              'product-content__card__main-image',
              ZoomableImg
            )}
            previewSliderData={makeSliderData(
              'product-content__card__preview-image',
              'img'
            )}
          />
        </div>

        <div className="product-content__purchase">
          <div className="product-content__purchase__title">
            {productData.title}
          </div>

          {productData.description && (
            <div className="product-content__purchase__description">
              {parse(productData.description)}
            </div>
          )}

          <div className="product-content__purchase__price">
            {formatPrice(productData.price)}
            {stock && (
              <div className="product-content__purchase__price__stockrecords">
                <p>- ?????????????????? (???? 10??): <br />
                  <b>
                    &nbsp;
                    {stock.price_upto10k ? (
                      formatPrice(stock.price_upto10k)
                    ) : '????????????????????'}
                  </b>
                </p>
                <p>- ???????????????????????? (???? 30??): <br />
                  <b>
                    &nbsp;
                    {stock.price_upto30k ? (
                      formatPrice(stock.price_upto30k)
                    ) : '????????????????????'}
                  </b>
                </p>
                <p>- ?????????????? (???? 30??): <br />
                  <b>
                    &nbsp;
                    {stock.price_from30k ? (
                      formatPrice(stock.price_from30k)
                    ) : '????????????????????'}
                  </b>
                </p>
              </div>
            )}
          </div>

          <div className="product-content__purchase__actions">
            <button
              className="product-content__purchase__actions__wish"
              onClick={onWishClick}
            >
              {wishlistAddLoading || wishlistDeleteLoading ? (
                <Loading color="red" />
              ) : (
                <img
                  className="product-content__buy__purchase__wish__img icon-default"
                  src={wishlistId ? images.heartFill : images.heartOutline}
                  alt=""
                />
              )}
            </button>

            <button
              className="product-content__purchase__actions__cart"
              onClick={onPurchaseClick}
            >
              {availabilityAmount > 0 ? '?? ??????????????' : '??????????????????'}
            </button>
          </div>

          <div className="product-content__purchase__alerts">
            {wishlistAddError &&
              showErrors(wishlistAddError.response, {
                non_field: {
                  already_exists: '?????????? ?????? ?? ??????????????????',
                  not_authenticated:
                    '???????????? ???????????????????????????? ???????????????????????? ?????????? ?????????????????? ???????????? ?? ???????????? ??????????????',
                },
              })}

            {wishlistDeleteError && showErrors(wishlistDeleteError.response)}

            {errorLine &&
              showErrors(errorLine.response, {
                reason: {
                  unknown_error: '?????????? ???????????????????? ???????????? ???????????????? ?? ??????????????',
                },
                id: {
                  undefined: '?????????? ???????????? ???? ?? ??????????????',
                },
              })}
          </div>

          {profileData && profileData.is_staff && (
            <LinkRel
              target="_blank"
              href={`/dashboard/catalogue/products/${id}/`}
              style={{
                marginTop: '1em',
                width: 'fit-content',
                alignSelf: 'center',
              }}
            >
              ??????????????????????????
            </LinkRel>
          )}
        </div>

        <div className="product-content__info">
          <div className="product-content__info__title">????????????????????????????</div>
          <div className="product-content__info__detail">
            <table className="product-content__info__detail__attributes">
              <tbody>
                <tr>
                  <td>??????????????</td>
                  <td>{productData.upc}</td>
                </tr>
                <tr>
                  <td>?????? ????????????</td>
                  <td>{category.name}</td>
                </tr>
                {productData.attributes &&
                  productData.attributes
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((a) => (
                      <tr key={a.code}>
                        <td>{a.name}</td>
                        <td>{a.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LoadablePage>
  );
}
