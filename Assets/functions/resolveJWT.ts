import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';

export function resolveJWT(token: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, config.get('jwtkey'));
    if (typeof payload == 'object' && payload != null) return payload;
    return null;
  } catch (e) {
    return null;
  }
}
