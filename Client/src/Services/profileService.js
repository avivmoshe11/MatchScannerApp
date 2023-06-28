import Cookies from 'js-cookie';
import { formatter, url } from './httpService';

export async function createProfile(body) {
  const response = await fetch(`${url}/profiles/profile`, formatter('POST', body));
  const res = await response.json();
  if (res?.profile) Cookies.set('user-profile', res.profile.id, { path: '/' });
  return res;
}

export async function getProfile() {
  const response = await fetch(`${url}/profiles/profile`, formatter('GET'));
  const res = await response.json();
  return res;
}

export async function getProfileById(id) {
  const response = await fetch(`${url}/profiles/${id}`, formatter('GET'));
  const res = await response.json();
  return res;
}

export function getProfileFromCookies() {
  return Cookies.get('user-profile');
}

export function removeProfile() {
  return Cookies.remove('user-profile');
}

export default { createProfile, getProfile, getProfileFromCookies, removeProfile, getProfileById };
