import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { formatter, url } from './httpService';
import { removeProfile } from './profileService';

export async function loginUser(credentials) {
  const response = await fetch(`${url}/auth/login`, formatter('POST', credentials));
  const res = await response.json();
  if (!res.error) removeProfile();
  return res;
}

export async function logoutUser() {
  const response = await fetch(`${url}/auth/logout`, formatter('POST'));
  const res = await response.json();
  return res;
}

export async function createUser(credentials) {
  const response = await fetch(`${url}/users/`, formatter('POST', credentials));
  const res = await response.json();
  return res;
}

export async function getUser() {
  const response = await fetch(`${url}/users/`, formatter('GET'));
  const res = await response.json();
  return res;
}

// deprecated
function getJWT() {
  return Cookies.get('api-auth');
}

// deprecated
export function getUserFromCookies() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export default { loginUser, logoutUser, createUser, getUser };
