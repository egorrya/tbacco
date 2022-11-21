import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { staticPage } from '../../../actions/actionCreators.js';
import RawHtml from '../../elements/RawHtml/RawHtml.js';
import ErrorRetryBox from '../../partials/ErrorRetryBox/ErrorRetryBox.js';
import Loading from '../../partials/Loading/Loading.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';

export default function StaticPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.staticPage);

  const fetchStaticPage = () => {
    dispatch(staticPage.request(location.pathname));
  };

  useEffect(fetchStaticPage, [dispatch, location]);
  useEffect(() => {
    const main = document.getElementsByClassName('main-page-area')[0];
    const header = document.getElementsByClassName('header')[0];
    // main.classList.add('main-page-area-dark');
    // header.classList.add('header-dark-force');
    return () => {
      main.classList.remove('main-page-area-dark');
      header.classList.remove('header-dark-force');
    };
  }, []);

  const { title, content } = data;

  return (
    <TitledPage
      titleJsx={title}
      containerData={{ style: { position: 'relative', 'z-index': '10' } }}
    >
      {error && (
        <ErrorRetryBox handleRetry={fetchStaticPage} msg={error.message} />
      )}
      {loading && <Loading />}
      {content && <RawHtml>{content}</RawHtml>}
    </TitledPage>
  );
}
