import Cookies from 'js-cookie';

export function setCsrfToken(token) {
  console.log('set : ' ,token);
  Cookies.set('csrftoken', token);
}
