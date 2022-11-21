import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productPreview as productPreviewCreators } from '../../../actions/actionCreators.js';
import images from '../../../images.js';
import ProductContent from '../ProductContent/ProductContent.js';

import { motion } from 'framer-motion';
import './product-preview.scss';

export default function ProductPreview() {
  const { data: productPreviewData } = useSelector(
    (state) => state.productPreview
  );
  const dispatch = useDispatch();

  const productId = productPreviewData && productPreviewData.id;

  useEffect(() => {
    document.body.style.overflow = productId ? 'hidden' : 'auto';
  }, [productId]);

  if (!productId) {
    return null;
  }

  const closePreview = () => dispatch(productPreviewCreators.clear());

  const onDialogClick = (event) => {
    if (event.target === event.currentTarget) {
      closePreview();
    }
  };

  return (
    <motion.dialog
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      className="product-preview"
      onClick={onDialogClick}
    >
      <div className="product-preview__panel">
        <div className="product-preview__container">
          <button
            className="product-preview__panel__close"
            onClick={closePreview}
          >
            <img
              className="icon-default"
              alt="закрыть"
              src={images.crossGray}
            />
          </button>

          <ProductContent id={productId} />
        </div>
      </div>
    </motion.dialog>
  );
}
