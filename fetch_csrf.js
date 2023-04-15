// fetch and store csrf token in cookies
import { setCsrfToken } from './csrf';

export async function fetchData() {
  const response = await fetch('http://127.0.0.1:8000/csrf/');
  const data = await response.json();

  const csrfToken = data.csrfToken;
  console.log(csrfToken);
  setCsrfToken(csrfToken);
}
