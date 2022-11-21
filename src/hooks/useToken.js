import { useSelector } from 'react-redux';
import { getToken, setToken } from '../token.js';


export default function useToken() {
  const { data } = useSelector((state) => state.login);

  if (data && data.auth_token) {
    const token = data.auth_token;
    if (token && token !== getToken()) {
      setToken(token);
    }
  }

  return getToken();
}
