import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import ProductContent from '../../partials/ProductContent/ProductContent.js';
import { extractProductId } from '../../utils.js';


export default function Product() {
  const { id } = useParams();
  const productId = extractProductId(id);
  const selector = (state) => state.product;
  const { data: productData } = useSelector(selector);
  const category = productData.categories ? productData.categories[0] : {};

  return (
    <TitledPage
      titleJsx={category.name || ''}
      containerData={{ className: 'product' }}
    >
      <ProductContent id={productId} />
    </TitledPage>
  );
}
