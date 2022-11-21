const TOKEN_KEY = 'tbacco-token';

export function hasToken() {
  return TOKEN_KEY in localStorage;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(value) {
  localStorage.setItem(TOKEN_KEY, value);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
