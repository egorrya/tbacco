import React from 'react';
import { Helmet } from 'react-helmet';
import FullPageContainer from '../FullPageContainer/FullPageContainer.js';
import './titled-page.scss';

export default function TitledPage({ children, titleJsx, containerData }) {
  return (
    <FullPageContainer>
      <Helmet>
        <title>{titleJsx}</title>
      </Helmet>
      <div className="titled-page">
        <div className="titled-page__title">{titleJsx}</div>
        <div {...containerData}>{children}</div>
      </div>
    </FullPageContainer>
  );
}
