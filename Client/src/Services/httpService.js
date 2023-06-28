import config from '../config.json';

export function formatter(method, body = null) {
  const form = {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (body) form.body = JSON.stringify(body);

  return form;
}

export const url = process.env.NODE_ENV === 'development' ? config.developmentUrl : config.apiUrl;
