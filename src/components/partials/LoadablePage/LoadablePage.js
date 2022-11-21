import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading/Loading.js';
import routes from '../../../routes.js';
import useToken from '../../../hooks/useToken.js';
import ErrorRetryBox from '../ErrorRetryBox/ErrorRetryBox.js';

export default function LoadablePage({ children, selector, request }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selector);
  const token = useToken();

  const fetchData = () => {
    dispatch(request());
  };

  useEffect(fetchData, [dispatch, token]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    if (error.status === 401) {
      return (
        <Redirect
          to={{
            pathname: routes.login.to,
            search: new URLSearchParams({
              next: `${location.pathname}${location.search}`,
            }).toString(),
          }}
        />
      );
    }
    return <ErrorRetryBox handleRetry={fetchData} msg={error.message} />;
  }

  return children;
}
